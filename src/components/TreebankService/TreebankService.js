import { MessagingService, ResponseMessage, WindowIframeDestination as Destination } from 'alpheios-messaging/dist/dev/alpheios-messaging.js'
import { TreebankDestinationConfig } from './TreebankDestinationConfig.js'

class TreebankService {
  constructor(arethusa) {
    const messagingServiceName = 'TreebankRequestListener'
    /**
     * supportedRequests contains the supported Arethusa API requests in the format
     * <requestName>: [ <requiredParameters> ]
     */
    const supportedRequests = {
      getMorph: ['sentenceId','wordId'],
      nextSentence: [],
      prevSentence: [],
      gotoSentence: ['sentenceId']
    }
    this.activate = this.activate.bind(this)
    this.arethusa = arethusa

    /**
     * alpheios-messaging MessageService message handler function
     * @param {Object} request is a request object. It has one property 'body', an object
     *                 which has as it's only property named per the service request to execute
     *                 which is itself an object with the service method's parameters and their 
     *                 values
     * @param {Function} responseFn a callback function which sends the service response to the client
     */
    this.messageHandler = (request, responseFn) => {
      let requestName
      for (let name in supportedRequests) {
        if (request.body[name]) {
          requestName = name
          break
        }
      }
      if (! requestName) {
        responseFn(ResponseMessage.Error(request, new Error(`Unsupported request. Valid requests are ${supportedRequests}`)))
        return
      }
      let widget = this.arethusa.getWidget()
      let api = widget.api()
      let validParams = []
      let missingParams = []
      for (let param of supportedRequests[requestName]) {
        if (request.body[requestName][param]) {
          validParams.push(request.body[requestName][param])
        } else {
          missingParams.push(param)
        }
      }
      if (missingParams.length > 0) {
        responseFn(ResponseMessage.Error(request, new Error(`Missing required parameter(s): ${missingParams}`)))
      } else {
        Promise.resolve(api[requestName](...validParams)).then((result) => {
          responseFn(ResponseMessage.Success(request, result.RDF))
        }).catch((error) => { 
          responseFn(ResponseMessage.Error(request, error))
        })
      }
    }
  }


  /**
   * Activate the TreebankService
   */
  activate() {
    document.addEventListener('DOMContentLoaded', () => {
      const service = new MessagingService("treebank-service", new Destination(TreebankDestinationConfig))
      service.registerReceiverCallback(TreebankDestinationConfig.name, this.messageHandler)
    })
  }
}

export default TreebankService


