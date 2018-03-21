'use strict';

var ShaderProgram = function(gl, vertSource, fragSource) {

    this.program = createProgram(gl, getShaderSource(vertSource), getShaderSource(fragSource));

    // -- Default uniforms
    this.unifModel = gl.getUniformLocation(this.program, 'u_model');
    this.unifViewProj = gl.getUniformLocation(this.program, 'u_viewProj');

    // -- Default attributes
    this.attribPosition = gl.getAttribLocation(this.program, 'a_position');
    this.attribVertex = gl.getAttribLocation(this.program, 'a_vertex');

    this.draw = function(gl, geo, viewProj) {
        gl.useProgram(this.program);

        // Set uniforms
        gl.uniformMatrix4fv(this.unifModel, false, geo.model);
        gl.uniformMatrix4fv(this.unifViewProj, false, viewProj);

        // Set attributes
        gl.enableVertexAttribArray(this.attribPosition);
        gl.bindBuffer(gl.ARRAY_BUFFER, geo.posBuffer);
        gl.vertexAttribPointer(this.attribPosition, 3, gl.FLOAT, false, 0, 0);

        gl.vertexAttribDivisor(0, 0);
        gl.drawElements(geo.drawMode, geo.getIdxCount(), gl.UNSIGNED_SHORT, 0);
        gl.disableVertexAttribArray(0);
    }

    this.drawPoints = function(gl, emitter, viewProj) {
        gl.useProgram(this.program);

        // Set uniforms
        gl.uniformMatrix4fv(this.unifViewProj, false, viewProj);

        gl.bindBuffer(gl.ARRAY_BUFFER, emitter.points.posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, 3 * 1000000, gl.STREAM_DRAW); // Buffer orphaning, a common way to improve streaming perf. See above link for details.
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, emitter.points.positions);

        // Set attributes
        gl.enableVertexAttribArray(this.attribPosition);
        gl.bindBuffer(gl.ARRAY_BUFFER, emitter.points.posBuffer);
        gl.vertexAttribPointer(this.attribPosition, 3, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(1);
        gl.bindBuffer(gl.ARRAY_BUFFER, emitter.points.vertexBuffer);
        gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);

        gl.vertexAttribDivisor(0, 1);
        gl.vertexAttribDivisor(1, 0);

        gl.drawArraysInstanced(emitter.points.drawMode, 0, 3, emitter.numParticles);
        gl.disableVertexAttribArray(0);
        gl.disableVertexAttribArray(1);
    }
}
