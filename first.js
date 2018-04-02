var tf = require('@tensorflow/tfjs');

function costFunction (X,y,theta, size) {

  /* Returns the mean of the square of distances between the predicted value
    of y(i) for some values of theta. Lower cost means more accurate predictions. */

  let m = size; // Number of samples in our dataset
  let h = X.matMul(theta); // Hypothesis
  let square = tf.tensor(2).toInt(); // Matrix to square our error matrix

  let errors = h.sub(y); // Calculate error b/w the predicted value of y and the acutal value of y

  let sqr_errors = tf.pow(errors,square); // Square errors matrix

  let a = tf.scalar(1/(2*m)); // 1/2m

  console.log('Ran Cost Function...\n Cost:');

  a.mul(sqr_errors.sum()).print(); // J = 1/2*m * sum(sqr_errors)

  return a.mul(sqr_errors.sum());



}

function gradientDescent (X,y,theta, rate, num_iters, size) {
  // Tensorflow doesn't support inv() and pinv() as of 4/1/2018
  // Returns optimal values of theta by running gradientDescent algo

  let m = tf.scalar(size); // Creates a scalar matrix of size

  for(var i = 1; i <= num_iters; i++) {
    let h = X.matMul(theta); // Hypothesis

    let error = tf.div(tf.sub(h,y), m);  // Calculate error b/w the predicted value of y and the acutal value of y

    let gradJ = tf.matMul(X.transpose(), error); // Calculating the derivative term after each iteration
    let alpha = tf.scalar(rate); // Storing the learning rate as a scalar
    theta = tf.sub(theta, tf.mul(alpha, gradJ)); // Updating theta as per theta = theta - alpha*k;

  }

  console.log('---------------- RAN GRADIENT DESCENT -----------------');
  console.log('Optimal values of theta: ');
  theta.print();
  costFunction(X,y,theta,size);

  return theta;
}

// normalEqn, gradientDescentMulti