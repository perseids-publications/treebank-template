/**
 * Configuration for an alpheios-messaging WindowsIframeDestination 
 *
 * When used by a messaging service to receive and respond to messages 
 * only and not send requests of its own, the only property that really
 * matters is the name -- the targetIframeID and targetURL are required
 * but not used (see https://github.com/alpheios-project/alpheios-messaging/issues/#3)
 *
 * @type {{targetIframeID: string, name: string, targetURL: string}}
 */
export const TreebankDestinationConfig = {
  name: 'treebank',
  targetIframeID: 'alpheios-treebank-frame',
  targetURL: 'http://example.org' 
}
