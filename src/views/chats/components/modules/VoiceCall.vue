<template>
    <div id="call-app" class="bg-white w-full h-full flex  flex-col items-center justify-between no-scroll-btn">
        <div class="body h-full w-full flex-col-center md:rounded-t-lg justify-between px-6 pt-5 bg-opacity-10 no-scroll-btn"
            :style="`background-color: ${opaqueBG};`">
            <div class="h-fit w-full flex-col-center">
                <p class="flex-row-center gap-x-1 text-xs text-neutral-400" :class="{ 'collapse': props.shouldEndCall }"
                    v-if="inCall">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
                        <path fill-rule="evenodd"
                            d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                            clip-rule="evenodd" />
                    </svg>
                    <span v-motion-slide-top>Call Encrypted</span>
                </p>

                <div class="rounded-full w-28 h-28 grid place-items-center mt-10" v-if="!inCall && !props.shouldEndCall">
                    <img :src="props.details.user.profilePicture"
                        v-if="props.details.user.profilePicture !== 'https://i.ibb.co/gtpxMJz/21.png'"
                        class="w-28 h-28 rounded-full object-cover object-center" alt="">
                    <Avatar size="100%" v-else :color="customColor" :fname="props.details.user.fname"
                        :lname="props.details.user.surname" />
                </div>

                <div class="flex-col-center gap-y-1 w-full mt-5">
                    <h1 class="text-white text-lg ubuntu">{{ props.details.user.fname }} {{ props.details.user.surname }}
                    </h1>
                    <h3 class="text-sm text-gray-200"
                        v-if="!inCall && !connected && props.details.event === 'calling' && !props.shouldEndCall">
                        Caling
                    </h3>
                    <h3 class="text-sm text-gray-200"
                        v-if="!inCall && connected && props.details.event === 'calling' && !props.shouldEndCall">
                        Ringing
                    </h3>
                    <h3 class="text-sm text-gray-200"
                        v-if="!inCall && props.details.event === 'receiving' && !props.shouldEndCall">Habeep voice
                        call
                    </h3>
                    <h3 v-motion-slide-bottom class="text-sm text-gray-200" v-if="inCall && !props.shouldEndCall">{{
                        formatTimer(((callTime.minutes
                            - 1) * 60) + callTime.seconds)
                    }}</h3>
                    <h3 class="text-sm text-gray-200 mt-2 animate-bounce" v-if="props.shouldEndCall">Call Ended</h3>

                </div>
            </div>

            <div class="rounded-full w-40 h-40 grid place-items-center mic-v"
                :class="{ 'mic-v-5-20': userMicVolume >= 5, 'mic-v-20-40': userMicVolume >= 20, 'mic-v-40-60': userMicVolume >= 40, 'mic-v-60-80': userMicVolume >= 60, 'mic-v-80-100': userMicVolume >= 80 }"
                v-motion-pop v-if="inCall && !props.shouldEndCall">
                <img :src="props.details.user.profilePicture"
                    v-if="props.details.user.profilePicture !== 'https://i.ibb.co/gtpxMJz/21.png'"
                    class="w-40 h-40 rounded-full object-cover object-center" alt="">
                <Avatar size="100%" v-else :color="customColor" :fname="props.details.user.fname"
                    :lname="props.details.user.surname" />
            </div>

            <!-- to take space -->
            <div class="rounded-full w-28 h-28 grid place-items-center collapse" v-if="inCall">
                <img :src="props.details.user.profilePicture"
                    v-if="props.details.user.profilePicture !== 'https://i.ibb.co/gtpxMJz/21.png'"
                    class="w-28 h-28 rounded-full object-cover object-center" alt="">
                <Avatar size="100%" v-else :color="customColor" :fname="props.details.user.fname"
                    :lname="props.details.user.surname" />
            </div>
        </div>

        <div class="bottom-tab-calling h-24 w-full"
            v-if="((!inCall && props.details.event === 'calling') || inCall) && !props.shouldEndCall"
            :style="`background-color: ${opaqueBG};`">
            <div v-motion-slide-bottom
                class="h-full w-full rounded-t-2xl  bg-slate-800 flex-row-center px-6 justify-between md:justify-center md:gap-x-10">
                <div @click="mute_unmuteSound" class="volume transition-all text-gray-200 p-3 rounded-full bg-opacity-40 "
                    :class="{ 'bg-gray-400': soundMuted }">
                    <!-- mute audio -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                        <path
                            d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
                    </svg>

                </div>

                <div @click="mute_unmuteMic" class="transition-all mic p-3 rounded-full bg-opacity-40 "
                    :class="{ 'bg-gray-400': micMuted }">
                    <!-- mute mic -->
                    <svg fill="#e5e7eb" width="28px" height="28px" viewBox="-2.4 -2.4 28.80 28.80"
                        xmlns="http://www.w3.org/2000/svg" stroke="#e5e7eb">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M10.5,3.73a2,2,0,0,1,2.95-.14A2,2,0,0,1,14,5V8.41a1,1,0,0,0,2,0V5A4,4,0,0,0,9,2.47,1,1,0,1,0,10.5,3.73Zm8.22,9.54.2,0a1,1,0,0,0,1-.81A7.91,7.91,0,0,0,20,11a1,1,0,0,0-2,0,5.54,5.54,0,0,1-.11,1.1A1,1,0,0,0,18.72,13.27Zm3,6.06-18-18a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L8,8.48V11a4,4,0,0,0,6,3.46l1.46,1.46A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8,8,0,0,0,7,7.93V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93a7.87,7.87,0,0,0,3.85-1.59l3.4,3.4a1,1,0,0,0,1.42-1.41ZM12,13a2,2,0,0,1-2-2v-.52l2.45,2.46A1.74,1.74,0,0,1,12,13Z">
                            </path>
                        </g>
                    </svg>
                </div>

                <div class="bg-red-600 p-3 rounded-full" @click="endCall">
                    <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M8 13.4782L8 12.8617C8 12.8617 8 11.3963 12 11.3963C16 11.3963 16 12.8617 16 12.8617V13.25C16 14.2064 16.7227 15.0192 17.7004 15.1625L19.7004 15.4556C20.9105 15.6329 22 14.7267 22 13.5429V11.4183C22 10.8313 21.8162 10.2542 21.3703 9.85601C20.2296 8.83732 17.4208 7 12 7C6.25141 7 3.44027 9.58269 2.44083 10.7889C2.1247 11.1704 2 11.6525 2 12.1414L2 14.0643C2 15.3623 3.29561 16.292 4.57997 15.9156L6.57997 15.3295C7.42329 15.0823 8 14.3305 8 13.4782Z"
                                fill="#ffffff"></path>
                        </g>
                    </svg>
                </div>
            </div>
        </div>

        <div class="bottom-tab-calling h-24 fixed bottom-1 w-full pb-5"
            v-if="!inCall && props.details.event === 'receiving' && !props.shouldEndCall">
            <div class="h-full w-full flex-row-center px-6 justify-between md:justify-center md:gap-x-10">
                <div class="flex-col-center gap-y-1">
                    <div class="bg-black bg-opacity-10 p-3 rounded-full" @click="endCall">
                        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M8 13.4782L8 12.8617C8 12.8617 8 11.3963 12 11.3963C16 11.3963 16 12.8617 16 12.8617V13.25C16 14.2064 16.7227 15.0192 17.7004 15.1625L19.7004 15.4556C20.9105 15.6329 22 14.7267 22 13.5429V11.4183C22 10.8313 21.8162 10.2542 21.3703 9.85601C20.2296 8.83732 17.4208 7 12 7C6.25141 7 3.44027 9.58269 2.44083 10.7889C2.1247 11.1704 2 11.6525 2 12.1414L2 14.0643C2 15.3623 3.29561 16.292 4.57997 15.9156L6.57997 15.3295C7.42329 15.0823 8 14.3305 8 13.4782Z"
                                    fill="#FF0000"></path>
                            </g>
                        </svg>
                    </div>
                    <span class="text-xs text-gray-400">Decline</span>
                </div>

                <div class="flex-col-center gap-y-1">
                    <div @click="answerCall()"
                        class="answer-call text-white animate-pulse hover:animate-none bg-green-400 p-3 rounded-full bg-opacity-40 ">
                        <!-- mute audio -->
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                            <path fill-rule="evenodd"
                                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <span class="text-xs text-gray-400">Click to accept</span>
                </div>


                <div class="flex-col-center gap-y-1">
                    <div class="bg-black bg-opacity-10 p-3 text-gray-200 rounded-full" @click="endCall">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path
                                d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                            <path
                                d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>

                    </div>
                    <span class="text-xs text-gray-400">Message</span>
                </div>


            </div>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable */
import { ref, watch } from 'vue'
import { Peer } from "peerjs";
import { useStore } from 'vuex'
import colorGenerator from 'random-color-rgb'
import { useStopwatch } from 'vue-timer-hook';
import { useRoute } from 'vue-router';

const route = useRoute()
const props = defineProps(['details', 'userOnline', 'shouldEndCall'])
const emit = defineEmits(['endCall', 'clean'])
const store = useStore()

const customColor = colorGenerator({ max: 100 })
const opaqueBG = customColor.substring(0, 3).concat('a').concat(customColor.substring(3, customColor.length - 1)).concat(', 0.7)')

const connected = ref(props.details.userOnline)

const inCall = ref(false)
const micMuted = ref(false)
const soundMuted = ref(false)

const callTime = ref(useStopwatch())

const userAudio = document.createElement('audio')
userAudio.style.display = 'none'
userAudio.setAttribute('autoplay', true)
document.querySelector('body').appendChild(userAudio)
let myAudioStream;

function formatTimer(number) {
    let minutes = Math.floor(number / 60).toString().padStart(2, '0');
    let seconds = (number % 60).toString().padStart(2, '0');;

    let timeString = `${minutes}:${seconds}`;

    return timeString

}

const telephoneSound = ref(new Audio('https://res.cloudinary.com/dfjud30cb/video/upload/v1692272398/telephone-ring.mp3'))
telephoneSound.value.load()

const answerBeepSound = ref(new Audio('https://res.cloudinary.com/dfjud30cb/video/upload/v1692272396/beep.mp3'))
answerBeepSound.value.load()

const disconnectBeepSound = ref(new Audio('https://res.cloudinary.com/dfjud30cb/video/upload/v1692272397/phone-disconnect.mp3'))
disconnectBeepSound.value.load()


function controlRingSound(action) {
    try {
        if (action === 'play') {
            telephoneSound.value.loop = true
            telephoneSound.value.play()
        }
        if (action === 'stop') {
            telephoneSound.value.pause()
            telephoneSound.value.muted = true
        }
    } catch (error) {
        return false
    }
}

function controlDBeepSound(action) {
    try {
        if (action === 'play') {
            disconnectBeepSound.value.loop = true
            disconnectBeepSound.value.play()
        }
        if (action === 'stop') {
            disconnectBeepSound.value.pause()
            disconnectBeepSound.value.muted = true
        }
    } catch (error) {
        return false
    }
}

function controlABeepSound(action) {
    try {
        if (action === 'play') {
            answerBeepSound.value.play()
        }
        if (action === 'stop') {
            answerBeepSound.value.pause()
            answerBeepSound.value.muted = true
        }
    } catch (error) {
        return false
    }
}

function mute_unmuteMic() {
    if (micMuted.value) {
        micMuted.value = false
        if (myAudioStream) {
            myAudioStream.getAudioTracks()[0].enabled = true
        }
    } else {
        micMuted.value = true
        if (myAudioStream) {
            myAudioStream.getAudioTracks()[0].enabled = false
        }
    }
}

function mute_unmuteSound() {
    if (soundMuted.value) {
        soundMuted.value = false
        if (userAudio && userAudio.muted) {
            userAudio.muted = false
        }
    } else {
        soundMuted.value = true
        if (userAudio && !userAudio.muted) {
            userAudio.muted = true
        }
    }
}


const addAudioStream = (audio, stream) => {
    audio.srcObject = stream;
    audio.preload = 'none'
    audio.addEventListener('canplaythrough', () => {
        audio.play();
    })
};

const myPeer = ref(null)

watch(() => props.shouldEndCall, (newValue) => {
    if (newValue === true) {
        controlRingSound('stop')
        controlDBeepSound('play')

        setTimeout(() => {
            controlDBeepSound('stop')
        }, 2000);
        if (userAudio && !userAudio.muted) {
            userAudio.muted = true
        }
        if (myAudioStream) {
            myAudioStream.getAudioTracks()[0].stop()
        }

        setTimeout(() => {
            if (myPeer.value) {
                myPeer.value.disconnect()
            }
            emit('clean')
        }, 1500);
    }
}, { deep: true })

function endCall() {
    try {
        controlRingSound('stop')
        controlDBeepSound('play')

        setTimeout(() => {
            controlDBeepSound('stop')
        }, 2000);

        if (myAudioStream) {
            myAudioStream.getAudioTracks()[0].stop()
        }
        emit('endCall')

        setTimeout(() => {
            if (myPeer.value && !myPeer.value.disconnected) {
                myPeer.value.disconnect()
            }
            emit('clean')
        }, 1500);
    } catch (error) {
        console.log(error)
        if (myAudioStream) {
            myAudioStream.getAudioTracks()[0].stop()
        }
        emit('endCall')

        setTimeout(() => {
            if (myPeer.value && !myPeer.value.disconnected) {
                myPeer.value.disconnect()
            }
            emit('clean')
        }, 1500);
    }
}

function getMicVolume(stream) {
    try {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);
        scriptProcessor.onaudioprocess = function () {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            const arraySum = array.reduce((a, value) => a + value, 0);
            const average = arraySum / array.length;
            userMicVolume.value = Math.round(average) || 0
        };
    } catch (error) {
        console.log(error)
        userMicVolume.value = 0
    }
}

const userMicVolume = ref(0)

async function makeCall() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });

        const peer = new Peer(store.state.user.username, {
            host: import.meta.env.VITE_PEER_HOST,
            port: import.meta.env.VITE_PEER_PORT,
            secure: true,
            path: "/caller/call",
        });

        myPeer.value = peer

        controlRingSound('play')
        peer.on('open', (id) => {
            let call = peer.call(props.details.handle, stream);
            myAudioStream = stream
            if (props.userOnline) {
                connected.value = true
            }
            call.on('stream', function (audioStream) {
                controlRingSound('stop')
                controlABeepSound('play')

                setTimeout(() => {
                    controlABeepSound('stop')
                }, 1000);
                inCall.value = true
                callTime.value.start()
                userMicVolume.value = getMicVolume(audioStream)
                addAudioStream(userAudio, audioStream)
            });

            call.on('close', () => {
                peer.disconnect()
                endCall()
            })

            call.on('error', (error) => {
                endCall()
            })
        })

        peer.on('disconnected', () => {
            peer.disconnect()
            endCall()
        })

        peer.on('close', () => {
            peer.disconnect()
            endCall()
        })
    } catch (error) {
        console.log(error)
        endCall()
    }
}

const callVar = ref(null)
const receiverStream = ref(null)

async function setupReceiverCall() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });

        const peer = new Peer(store.state.user.username, {
            host: import.meta.env.VITE_PEER_HOST,
            port: import.meta.env.VITE_PEER_PORT,
            secure: true,
            path: "/caller/call"
        });

        myPeer.value = peer

        peer.on('call', call => {
            controlRingSound('play')
            callVar.value = call
            myAudioStream = stream
            receiverStream.value = stream
            connected.value = true

            if (route.query.action === 'answer') {
                answerCall()
            } else if (route.query.action === 'decline') {
                endCall()
            }


            call.on('stream', function (audioStream) {
                userMicVolume.value = getMicVolume(audioStream)
                addAudioStream(userAudio, audioStream)
            });

            call.on('close', (error) => {
                endCall()
            })

            call.on('error', (error) => {
                endCall()
            })
        })

        peer.on('disconnected', () => {
            peer.disconnect()
            endCall()
        })

        peer.on('close', () => {
            peer.disconnect()
            endCall()
        })

        peer.on('error', (error) => {
            endCall()
        })
    } catch (error) {
        endCall()
    }
}

function answerCall() {
    try {
        if (callVar.value && receiverStream.value) {
            callVar.value.answer(receiverStream.value);
            callTime.value.start()
            inCall.value = true
            controlRingSound('stop')
            controlABeepSound('play')

            setTimeout(() => {
                controlABeepSound('stop')
            }, 1000);
        }
    } catch (error) {
        endCall()
    }
}


if (props.details.event === 'calling') {
    makeCall()
} else {
    setupReceiverCall()
}

</script>

<style scoped>
.mic-v {
    transition: 1s;
    box-shadow: 0 0 0 rgb(255, 255, 255);
}


.mic-v-5-20 {
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.3),
        0 0 0 10px rgba(255, 255, 255, 0.3) !important;
}

.mic-v-20-40 {
    box-shadow: 0 0 0 15px rgba(255, 255, 255, 0.3),
        0 0 0 20px rgba(255, 255, 255, 0.3) !important;
}

.mic-v-40-60 {
    box-shadow: 0 0 0 25px rgba(255, 255, 255, 0.3),
        0 0 0 30px rgba(255, 255, 255, 0.3) !important;
}

.mic-v-60-80 {
    box-shadow: 0 0 0 35px rgba(255, 255, 255, 0.3),
        0 0 0 40px rgba(255, 255, 255, 0.3) !important;
}

.mic-v-80-100 {
    box-shadow: 0 0 0 45px rgba(255, 255, 255, 0.3),
        0 0 0 50px rgba(255, 255, 255, 0.3) !important;
}
</style>