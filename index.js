
module.exports = function(game, opts) {
    return new Walk(game, opts)
}

function Walk(game, opts) {
  opts = opts || {}

  this.game = game  // note: optional
  this.skin = opts.skin
  if (!this.skin) throw "voxel-walk requires skin opt"
  this.walkSpeed = opts.walkSpeed || 1.0
  this.startedWalking = 0.0
  this.stoppedWalking = 0.0
  this.walking = false
  this.acceleration = opts.acceleration || 1.0

  this.shouldStopWalking = opts.shouldStopWalking
  if (this.game) this.enable()
}

Walk.prototype.enable = function() {
  var self = this

  function tick() {
     self.render()
     if (self.shouldStopWalking !== undefined) {
       if (self.shouldStopWalking()) {
         self.stopWalking() 
       } else {
         self.startWalking()
       }
     }
  }

  this.game.on('tick', tick)
  this.tick = tick
}

Walk.prototype.disable = function() {
  this.game.removeListener('tick', this.tick);
}

Walk.prototype.render = function() {
  var time = Date.now() / 1000

  if (this.walking && time < this.startedWalking + this.acceleration) {
    this.walkSpeed = (time - this.startedWalking) / this.acceleration
  }
  if (!this.walking && time < this.stoppedWalking + this.acceleration){
    this.walkSpeed = -1 / this.acceleration * (time - this.stoppedWalking) + 1
  }


  this.skin.head.rotation.y = Math.sin(time * 1.5) / 3 * this.walkSpeed
  this.skin.head.rotation.z = Math.sin(time) / 2 * this.walkSpeed
  
  this.skin.rightArm.rotation.z = 2 * Math.cos(0.6662 * time * 10 + Math.PI) * this.walkSpeed
  this.skin.rightArm.rotation.x = 1 * (Math.cos(0.2812 * time * 10) - 1) * this.walkSpeed
  this.skin.leftArm.rotation.z = 2 * Math.cos(0.6662 * time * 10) * this.walkSpeed
  this.skin.leftArm.rotation.x = 1 * (Math.cos(0.2312 * time * 10) + 1) * this.walkSpeed
  
  this.skin.rightLeg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10) * this.walkSpeed
  this.skin.leftLeg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10 + Math.PI) * this.walkSpeed
}

Walk.prototype.startWalking = function(){
  var now = Date.now() / 1000
  this.walking = true
  if (this.stoppedWalking + this.acceleration > now){
    var progress = now - this.stoppedWalking
    this.startedWalking = now - (this.stoppedWalking + this.acceleration - now)
  } else {
    this.startedWalking = Date.now() / 1000
  }
}

Walk.prototype.stopWalking = function() {
  var now = Date.now() / 1000
  this.walking = false
  if (this.startedWalking + this.acceleration > now){
    this.stoppedWalking = now - (this.startedWalking + this.acceleration - now)
  } else {
    this.stoppedWalking = Date.now() / 1000
  }
}

Walk.prototype.isWalking = function() {
  return this.walking
}

Walk.prototype.setAcceleration = function(newA) {
  this.acceleration = newA
}
