'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

class $Promise {
    constructor(executor) {
        if (typeof(executor) !== 'function') throw new TypeError('Executor must be a function');
        
        this._state = 'pending';
        this._handlerGroups = [];

        executor(this._internalResolve.bind(this), this._internalReject.bind(this));
    }

    _internalResolve(data) {
        if (this._state === 'pending') {
            this._value = data;
            this._state = 'fulfilled';
            this._callHandlers();
        }
    }
    
    _internalReject(reason) {
        if (this._state === 'pending') {
            this._value = reason;
            this._state = 'rejected';
            this._callHandlers();
        }
    }

    then(successCb, errorCb) {
        if (typeof(successCb) !== 'function' && typeof(errorCb) !== 'function') successCb = errorCb = false;
        this._handlerGroups.push({successCb, errorCb});
    }

    _callHandlers() {
        this._handlerGroups.forEach(group => {
            group.successCb();
            group.errorCb();
        })
    }
}
module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
