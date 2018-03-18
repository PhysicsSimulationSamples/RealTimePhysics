'use strict';

var ShaderProgram = function(gl, vertSource, fragSource) {

    this.program = createProgram(gl, getShaderSource(vertSource), getShaderSource(fragSource));

    // -- Default uniforms
    this.unifModel = gl.getUniformLocation(this.program, 'u_model');
    this.unifViewProj = gl.getUniformLocation(this.program, 'u_viewProj');

    // -- Default attributes
    this.attribPosition = gl.getAttribLocation(this.program, 'a_position');

    this.draw = function(gl, geo, viewProj) {
        gl.useProgram(this.program);

        // Set uniforms
        gl.uniformMatrix4fv(this.unifModel, false, geo.model);
        gl.uniformMatrix4fv(this.unifViewProj, false, viewProj);

        // Set attributes
        gl.enableVertexAttribArray(this.attribPosition);
        gl.bindBuffer(gl.ARRAY_BUFFER, geo.posBuffer);
        gl.vertexAttribPointer(this.attribPosition, 3, gl.FLOAT, false, 0, 0);

        gl.drawElements(geo.drawMode, geo.getIdxCount(), gl.UNSIGNED_SHORT, 0);
    }

    this.drawPoints = function(gl, emitter, viewProj) {
        gl.useProgram(this.program);

        // // Set uniforms
        gl.uniformMatrix4fv(this.unifViewProj, false, viewProj);

        // Set attributes
        gl.enableVertexAttribArray(this.attribPosition);
        gl.bindBuffer(gl.ARRAY_BUFFER, emitter.points.posBuffer);
        gl.vertexAttribPointer(this.attribPosition, 3, gl.FLOAT, false, 0, 0);

        gl.BindBuffer(GL_ARRAY_BUFFER, particles_position_buffer);
		gl.BufferData(GL_ARRAY_BUFFER, MaxParticles * 4 * sizeof(GLfloat), NULL, GL_STREAM_DRAW); // Buffer orphaning, a common way to improve streaming perf. See above link for details.
		gl.BufferSubData(GL_ARRAY_BUFFER, 0, ParticlesCount * sizeof(GLfloat) * 4, g_particule_position_size_data);

        gl.drawArraysInstanced(emitter.points.drawMode, 0, 3, emitter.numParticles);
    }
}

