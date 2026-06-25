//Pannel
AFRAME.registerComponent('pannel', {
  schema: {
    width: {default: .3},
    height: {default: .1},
    color: {default: 'black'},
    textColor: {default: 'white'},
    textValue: {default: '{{dynamicText}}'},
    dynamicText: {type: 'string', default: ''}, // Placeholder for variable text
    textAlign: {default: 'center'},
    textWidth: {default: 0.9},
    font: {default: 'https://cdn.aframe.io/fonts/Exo2SemiBold.fnt'},
    class:{default: 'clickable'},
    shader:{default: 'flat'}
  },
  init: function() {
    this.el.classList.add(this.data.class);
    this.updateText();
  },
  update: function() {
    this.updateText();
  },
  updateText: function() {
    // Replace the placeholder with the dynamic text
    var textWithDynamicPart = this.data.textValue.replace('{{dynamicText}}', this.data.dynamicText);

    this.el.setAttribute('geometry', {
      primitive: 'plane',
      width: this.data.width,
      height: this.data.height
    });
    this.el.setAttribute('material', {
      color: this.data.color,
      shader: this.data.shader
    });
    this.el.setAttribute('text', {
      width: this.data.textWidth,
      height: this.data.textHeight,
      value: textWithDynamicPart,
      color: this.data.textColor,
      align: this.data.textAlign,
      font: this.data.font
    });
  }
});

//Redirect
AFRAME.registerComponent('clickable-redirect', {
    init: function() {
        this.el.addEventListener('click', () => {
            const url = this.el.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
    }
});


//Video Loading
  // window.onload = function() {
  //   document.querySelectorAll('video').forEach(video => {
  //     video.play().catch(error => console.error('Error attempting to play video:', error));
  //   });
  // };

  // // Intersection Observer for videos
  // let observer = new IntersectionObserver((entries) => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       entry.target.play().catch(error => console.error('Error attempting to play video:', error));
  //     }
  //   });
  // }, { threshold: 0.5 });

  // document.querySelectorAll('video').forEach(video => {
  //   observer.observe(video);
  // });


  const easeInOutQuad = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;

  const showAvatar = (onDone) => {
    const avatar = document.querySelector("#avatar");
    let z = -1;
    let scale = 0;
    let rotation = 0;
    const startTime = Date.now();
    const id = setInterval(() => {
      const currentTime = Date.now() - startTime;
      const progress = Math.min(currentTime / 2000, 1); // Easing in over one second
      const easedProgress = easeInOutQuad(progress);
      z = 0 * easedProgress;
      scale = 0.4 * easedProgress;
      rotation = 360 * easedProgress;
      if (progress >= 1) {
        clearInterval(id);
        onDone();
      }
      avatar.setAttribute("position", `0 0 ${z}`);
      avatar.setAttribute("scale", `${scale} ${scale} ${scale}`);
      avatar.setAttribute("rotation", ` ${rotation} 270 ${rotation}`);
    }, 10);
  }
  AFRAME.registerComponent('mytarget', {
    init: function () {
      this.el.addEventListener('targetFound', event => {
        console.log("target found");
        showAvatar(() => {
          setTimeout(() => {
            // showPortfolio(() => {
            //   setTimeout(() => {
            //     showInfo();
            //   }, 300);
            // });
          }, 300);
        });
      });
      this.el.addEventListener('targetLost', event => {
        console.log("target found");
      });
      //this.el.emit('targetFound');
    }
  });

  //Video Loading
  window.onload = function() {
    document.querySelectorAll('video').forEach(video => {
      video.play().catch(error => console.error('Error attempting to play video:', error));
    });
  };

  // Intersection Observer for videos
  let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play().catch(error => console.error('Error attempting to play video:', error));
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('video').forEach(video => {
    observer.observe(video);
  });