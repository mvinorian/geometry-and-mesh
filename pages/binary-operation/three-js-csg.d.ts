declare module 'three-js-csg' {
    import { Geometry } from 'three';
  
    export class ThreeBSP {
      constructor(geometry: Geometry);
      union(other: ThreeBSP): ThreeBSP;
      subtract(other: ThreeBSP): ThreeBSP;
      intersect(other: ThreeBSP): ThreeBSP;
      toGeometry(): Geometry;
    }
  }
  