# N-Body Simulation

This is a sample application written with Angular (with Angular Material and RxJS) and a simple canvas rendering.  It provides a basic demonstration of a N-Body simulation using the Barnes-Hut algorithm.

# Barnes-Hut Simulation

The Barnes-Hut Simulation is an approximation algorithm that can reduce the time complexity of a n-body simulation at
the expense of accuracy.  It accomplishes this by breaking space into quadrants (octants in 3D) and reducing each quad into new nodes until only one body occupies a qaud. The forces are then approximated by using the center of mass (CoM) for a quad if it is sufficiently far away.

Sufficiently far is defined by the parameter &theta; which represents the ratio of quadrant-length over distance between target bodies (either body-body or body-CoM).  A &theta; value of zero is worse than the brute-force approach incurring tree
construction penalties too.  A &theta; value of one provides good performance with small error.  Higher values incur higher error and faster run-time.

(https://en.wikipedia.org/wiki/Barnes%E2%80%93Hut_simulation)

## How to run

1. Execute `npm start`
2. Open `localhost:4200` in a browser

Within the application you can:

1. Adjust the number of bodies.
2. Change the value of &theta;.  High values are less accurate, but more preferment.  Low values are more accurate.  A
   value of 1 others a decent compromise.
3. Change the value &Delta;t.
4. Click on any body to see it's details
    - Position, velocity, force, and rendering options

## TODO

- Implement E2E
- Implement component/unit tests
- Implement body generators and drop down selector
  - Random generator
  - User defined bodies
  - Pre-configured scenes, e.g. stable orbits, etc
- Separate canvas rendering logic from simulation logic (visitor pattern similar approach)
  - Body
  - BarnesHutNode
  - Boundary
- Move simulation calculation loop to WebHelper
  - Test the overhead of messaging between threads
- Switch to drawing library (abstract out canvas/WebGL support), e.g. two.js or similar
- Implement better integration method
  - Leap-frog
  - Runge-Kutta
- Implement D3 charts for error growth vs. &theta; value.
