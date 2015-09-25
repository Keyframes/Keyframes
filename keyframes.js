var keyframes = (function() {

    keyframes.prototype.supported = (document.body.style.animationName !== undefined);
    keyframes.prototype.elem = [];
    keyframes.prototype.count = 0;

    keyframes.prototype.createStyleElement = function(id, css) {
        var styleElem = document.createElement('style');
        styleElem.innerHTML = css;
        styleElem.className = "keyframe-style";
        styleElem.setAttribute('id', frameId);
        document.head.appendChild(styleElem);
    }

    function keyframes(elem) {
        if (typeof elem == 'string') {
            elem = document.querySelectorAll(elem);
        }
        this.elem = elem;
    }

    keyframes.prototype.generate = function(frameData) {
        this.count++;

        var frameName, frameId = "keyframe_" + this.count;
        if (frameData.name) {
            frameName = frameData.name;
            frameId = "keyframe_" + frameName;
        }

        var css = "@keyframes " + frameName + " {";

        for (var key in frameData) {
            if (key !== "name" && key !== "media" && key !== "complete") {
                css += key + " {";

                for (var property in frameData[key]) {
                    css += property + ":" + frameData[key][property] + ";";
                }

                css += "}";
            }
        }

        css += "}";

        if (frameData.media) {
            css = "@media " + frameData.media + "{" + css + "}";
        }

        var frameStyle = document.getElementById(id);

        if (frameStyle.length > 0) {
            frameStyle.innerHTML += css;

            var elems = document.querySelectorAll("[style]");

            for (var i = 0, elem;
                (elem = elems[i]) !== undefined; i++) {
                if (this.style["animationName"] === frameName) {
                    var options = elem.getAttribute("keyframeOptions");
                    this.resetKeyframe(function() {
                        this.playKeyframe(options);
                    });
                }
            }
        } else {
            this.createStyleElement(frameId, css)
        }
    }

    keyframes.prototype.define = function(frameData) {
        if (frameData.length) {
            for (var i = 0; i < frameData.length; i++) {
                var frame = frameData[i];
                this.generate(frame);
            }
        } else {
            this.generate(frameData);
        }
    },

    keyframes.prototype.setPlayState = function(elem, running) {
        return elem.style.animationPlayState = (running ? 'running' : 'paused')
    }

    return keyframes;

})();

window.Keyframes = new keyframes();
