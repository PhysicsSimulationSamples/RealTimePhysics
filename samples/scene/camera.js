'use strict';

var Camera = function() {
	this.view = mat4.create();
    mat4.lookAt(this.view, [0.0, 0.0, -12.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

    this.perspective = mat4.create();
    mat4.perspective(this.perspective, Math.PI * 54 / 180, 1, 1, 1000000);

    this.viewProj = mat4.create();
    mat4.multiply(this.viewProj, this.perspective, this.view);
};