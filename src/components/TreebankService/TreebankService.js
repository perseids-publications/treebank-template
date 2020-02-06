import { MessagingService, ResponseMessage, WindowIframeDestination as Destination } from 'alpheios-messaging/dist/dev/alpheios-messaging.js'
import { TreebankDestinationConfig } from './TreebankDestinationConfig.js'

class TreebankService {
  constructor(arethusa) {
    const messagingServiceName = 'TreebankRequestListener'
    this.activate = this.activate.bind(this)
    this.arethusa = arethusa
    this.messageHandler = (request, responseFn) => {
      if (request.body.getToken) {
        // This is a get token request
        // pass to the Arethusa API
        let widget = this.arethusa.getWidget()
        let api = widget.api()
        console.log("Request Received",request.body.getToken)
        Promise.resolve(api.getToken(request.body.getToken.token)).then((result) => {
            console.info("Result",result.morphology.postag)
            let morphInfo = {}
            if (result.morphology) {
              morphInfo.lemma = result.morphology.lemma
              morphInfo.postag = result.morphology.postag
              morphInfo.gloss = result.morphology.gloss
            }
            responseFn(ResponseMessage.Success(request, morphInfo))
          }).catch((error) => { 
            console.info("Error",error)
            responseFn(ResponseMessage.Error(request, error))
          })
      } else {
        responseFn(ResponseMessage.Error(request, new Error('Unsupported request')))
      }
    }

  }

  activate() {
    document.addEventListener('DOMContentLoaded', () => {
      const service = new MessagingService("treebank-service", new Destination(TreebankDestinationConfig))
      service.registerReceiverCallback(TreebankDestinationConfig.name, this.messageHandler)
    })
  }
}

export default TreebankService

