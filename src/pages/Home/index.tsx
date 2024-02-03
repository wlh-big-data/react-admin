/* 主页 */

import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import ThreeMeshUI from 'three-mesh-ui'

import "./index.less";
export default function HomePageContainer(): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 500);
    scene.background = new THREE.Color(0xf0f0f0);
    ref.current?.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.rotateSpeed = -0.25;

    camera.position.z = 5;

    const container = new ThreeMeshUI.Block({
      width: 1.2,
      height: 0.7,
      padding: 0.2,
      fontFamily: '/assets/SourceHanSansCN-Medium2.json',
      fontTexture: '/assets/siyuan2.png',
     });
     
     //
     
     const text = new ThreeMeshUI.Text({
      content: "方娟"
     });
     
     container.scale.set(10, 10, 10);
    //  text.scale.set(10, 10, 10);
     container.add( text );
     
     // scene is a THREE.Scene (see three.js)
     scene.add( container );

    function animate() {
      requestAnimationFrame(animate);
      controls.update();

      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      ThreeMeshUI.update();
    }

    animate();
  }, []);

  return (
    <div className="page-home all_nowarp">
      <div className="render" ref={ref}></div>
    </div>
  );
}
