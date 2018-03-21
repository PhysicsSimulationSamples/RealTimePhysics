'use strict';

var FluidParticle = function() {
	this.position = vec3.create();
	this.velocity = vec3.create();
	this.acceleration = vec3.create([0.0, -1.0, 0.0]);
}

var FluidEmitter = function(gl) {
	this.lifetime = 5000.0;
	this.numParticles = 10;
	this.particles = [];
	// size of positions * size of array
	this.positions = new Float32Array(this.numParticles * 3);
	for (var i = 0; i < this.numParticles; ++i) {
		var particle = new FluidParticle();
		particle.position = vec3.create(0, i, 0);
		this.positions[i*3 + 0] = 0;
		this.positions[i*3 + 1] = -5 + i * 0.1;
		this.positions[i*3 + 2] = 0;
		this.particles.push(particle);
	}
	this.points = new Points(gl, this.positions);
	this.points.create(gl); 
	// this.advect() {

	// }

}