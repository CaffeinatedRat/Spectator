/** @license
* Copyright (c) 2013, Ken Anderson <caffeinatedrat at gmail dot com>
* All rights reserved.
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*
* THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE AUTHOR AND CONTRIBUTORS BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*
* -----------------------------------------------------------------
* Required Libraries:
* 1) Three.js
* 2) crLib.min.js
* -----------------------------------------------------------------
*/

//-----------------------------------------------------------------
// Namespace
//-----------------------------------------------------------------
CaffeinatedRat.Minecraft = CaffeinatedRat.Minecraft || {};
CaffeinatedRat.Minecraft.Spectator = CaffeinatedRat.Minecraft.Spectator || {};

//-----------------------------------------------------------------
// Versioning
//-----------------------------------------------------------------
CaffeinatedRat.Minecraft.Spectator.VERSION = new CaffeinatedRat.Version(1, 0, 0);

//-----------------------------------------------------------------
// Data Types
//-----------------------------------------------------------------

/**
* @constructor
*/
CaffeinatedRat.Minecraft.Spectator.TextureCoordinates = function (u, v, color) {

    this._u = u;
    this._v = v;

    if (color !== undefined) {

        this._color = color;

    }

}

//-----------------------------------------------------------------
// Exceptions
//-----------------------------------------------------------------

/**
* @constructor
*/
CaffeinatedRat.Minecraft.Spectator.InvalidTexture = function (caller) {

    CaffeinatedRat.Exception.call(this, 'Minecraft.Spectator.' + caller, "The texture is an invalid texture object.  It must be a THREE.texture object.");

}

/**
* @constructor
*/
CaffeinatedRat.Minecraft.Spectator.SceneNotDefinedException = function () {

    CaffeinatedRat.Exception.call(this, 'Minecraft.Spectator.' + caller, "A scene must be defined for this block.");

}

/**
* @constructor
*/
CaffeinatedRat.Minecraft.Spectator.InvalidWebSocketServices = function (caller) {

    CaffeinatedRat.Exception.call(this, 'Minecraft.Spectator.' + caller, "An invalid WebSocketServices object was defined, or no WebSocketServices was defined.\r\nA WebSocketService object is required to run this library.");

}