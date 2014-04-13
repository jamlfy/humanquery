
/**
 * Module dependencies.
 */

var parse = require('./lib/parse');
var compile = require('./lib/compile');

module.exports = exports = function (mongo){
	var mongo = mongo || require('mongoose');

	/**
	 * Query String
	 *
	 * ####Example:
	 *	var model =...;
	 *	model.query('level:error OR type:upload', function(err, docs){
	 *		// More Code..
	 *	});
	 *
	 *	model.findOne().query('level:error OR type:upload', function(err, doc){
	 *		// More Code..
	 *	});
	 *
	 * @param {String} [callback]
	 * @api public
	 */

	mongo.Query.prototype.query = function (str, callback){
		if(typeof str != 'string')
			return callback(new Error('Is not a String'), null);
		var runs = this.find(compile(parse(str)));
		if(typeof callback != 'function')
			return runs;
		runs.exec(this.op, callback);
	};

	return mongo;
};

// expose methods
exports.parse = parse;
exports.compile = compile;
