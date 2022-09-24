class Microphone {
    constructor(fftSize) {
        this.initialized = false;
        navigator.mediaDevices.getUserMedia({
            audio: true
        })
            .then( function(stream) {
                this.audioContext = new AudioContext();
                this.microphone = this.audioContext.createMediaStreamSource(stream);
                this.analyzer = this.audioContext.createAnalyser();
                this.analyzer.fftSize = fftSize;
                const bufferLength = this.analyzer.frequencyBinCount;
                this.dataArray = new Uint8Array(bufferLength);
                this.microphone.connect(this.analyzer);
                this.initialized = true;
            }.bind(this))
            .catch(error => {
                alert(error.message);
            })
    }

    getSamples() {
       this.analyzer.getByteTimeDomainData(this.dataArray);
       return [...this.dataArray].map(e => e / 128 - 1);
    }

    getVolume() {
        this.analyzer.getByteTimeDomainData(this.dataArray);
        let normSamples =  [...this.dataArray].map(e => e / 128 - 1);
        let sum = 0;
        for (const sample of normSamples) {
            sum += sample * sample;
        }
        return Math.sqrt(sum / normSamples.length);
    }
}

export default Microphone;