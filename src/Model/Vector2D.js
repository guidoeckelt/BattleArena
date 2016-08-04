function Vector2D(X, Y){
	this.X = X;
	this.Y = Y;
}
//
Vector2D.prototype.length = function(){
    return Math.sqrt(Math.pow(this.X,2)+Math.pow(this.Y,2));
};
Vector2D.prototype.normalize = function(){
    var length = this.length();
    return new Vector2D(this.X/length, this.Y/length);
};
//Operators
Vector2D.prototype.add = function(other){
	if (Vector2D != other.prototype) {
		// TODO Exception
	}
	return new Vector2D(this.X+other.X, this.Y+other.Y);
};
Vector2D.prototype.substract = function(other){
    if (Vector2D != other.prototype) {
        // TODO Exception
    }
	return new Vector2D(this.X-other.X, this.Y+other.Y);
};
Vector2D.prototype.multipleByScalar = function(scalar){
    if (Number != scalar.prototype) {
        // TODO Exception
    }
    return new Vector2D(this.X*scalar, this.Y*scalar);
};