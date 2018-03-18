'use strict';

var FluidParticle = function() {
	this.position = vec3.create();
	this.velocity = vec3.create();
	this.acceleration = vec3.create([0.0, -1.0, 0.0]);
}

var FluidEmitter = function() {
	// this.lifetime = 5000.0;
	// this.numParticles = 1000;
	// this.particles = [];
	// for (var i = 0; i < this.numParticles; ++i) {
	// 	this.particles.push(new FluidParticle());
	// }

	// this.advect() {

	// }

}