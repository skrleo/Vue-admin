import Vue from 'vue'
import VueNativeSocket from 'vue-native-websocket'

export default function ({ store }) {
  Vue.use(VueNativeSocket, 'http://120.78.206.88:5200', {connectManually: true,});
}