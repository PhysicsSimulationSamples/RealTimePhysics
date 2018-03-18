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
}