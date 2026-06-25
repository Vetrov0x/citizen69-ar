AFRAME.registerComponent('stencil-plane', {
    schema: {
        gltfScale: { type: 'number', default: 1 }, // Scale of the attached glTF model
        gltfPosition: { type: 'vec3', default: { x: 0, y: 0, z: -1 } }, // Position of the glTF model
        gltfRotation: { type: 'vec3', default: { x: 0, y: 0, z: 0 } }, // Rotation of the glTF model
        applyColor: { type: 'boolean', default: false }, // Apply a solid color to the glTF model
        objectColor: { type: 'string', default: 'green' }, // Color of the glTF model if applyColor is true
        planeWidth: { type: 'number', default: 1 }, // Width of the plane
        planeHeight: { type: 'number', default: 1 }, // Height of the plane
        planeColor: { type: 'string', default: '#000' }, // Color of the plane
        gltfUrl: { type: 'string', default: '' }, // URL of the glTF model
        stencilTransparent: { type: 'boolean', default: false },
        stencilOpacity: { type: 'number', default: 1 }, // Opacity of the stencil material
        videoElementId: { type: 'string', default: '' }, // New property for the video element ID
        videoPosition: { type: 'vec3', default: { x: 0, y: 0, z: 0 } }, // Position of the video
        videoScale: { type: 'vec3', default: { x: 1, y: 1, z: 1 } }, // Scale of the video
    },
    init: function () {
        const scene = this.el.object3D;
        const data = this.data;

        // Create the plane geometry
        const planeGeom = new THREE.PlaneGeometry(data.planeWidth, data.planeHeight);
        const stencilMat = new THREE.MeshBasicMaterial({ color: data.planeColor });
        stencilMat.depthWrite = false;
        stencilMat.stencilWrite = true;
        stencilMat.stencilRef = 1;
        stencilMat.stencilFunc = THREE.AlwaysStencilFunc;
        stencilMat.stencilZPass = THREE.ReplaceStencilOp;
        if (data.stencilTransparent) {
            stencilMat.transparent = true;
            stencilMat.opacity = data.stencilOpacity;
        }
        const stencilMesh = new THREE.Mesh(planeGeom, stencilMat);
        scene.add(stencilMesh);

        // Load and add the glTF model
        if (data.gltfUrl) {
            const loader = new THREE.GLTFLoader();
            loader.load(data.gltfUrl, function (gltf) {
                const object = gltf.scene;
                object.scale.multiplyScalar(data.gltfScale);
                object.position.copy(data.gltfPosition);
                object.rotation.set(data.gltfRotation.x, data.gltfRotation.y, data.gltfRotation.z);

                object.traverse(function (child) {
                    if (child.isMesh) {
                        const originalMat = child.material.clone();
                        originalMat.stencilWrite = true;
                        originalMat.stencilRef = 1;
                        originalMat.stencilFunc = THREE.EqualStencilFunc;
                        if (stencilMat.transparent && data.stencilTransparent) {
                            originalMat.transparent = true;
                            originalMat.opacity = .1;
                        }
                        child.material = originalMat;
                    }
                });

                stencilMesh.add(object);
            });
        }
        if (data.videoElementId) {
            const videoEl = document.querySelector(data.videoElementId);
            if (videoEl) {
                const videoTexture = new THREE.VideoTexture(videoEl);
                const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
                videoMaterial.stencilWrite = true;
                videoMaterial.stencilRef = 1;
                videoMaterial.stencilFunc = THREE.EqualStencilFunc;
                videoMaterial.stencilFail = THREE.KeepStencilOp;
                videoMaterial.stencilZFail = THREE.KeepStencilOp;
                videoMaterial.stencilZPass = THREE.KeepStencilOp;
                const videoGeometry = new THREE.PlaneGeometry(data.planeWidth, data.planeHeight);
                const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);

                videoMesh.position.copy(data.videoPosition);
                videoMesh.scale.copy(data.videoScale);

                scene.add(videoMesh);
            }
        }
    }
});