import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// scene stuff
// texture loader
const textureLoader = new THREE.TextureLoader()
const normalMap = textureLoader.load("NormalMap.png")

// sphere
const sphereGeo = new THREE.SphereBufferGeometry(0.5, 64, 64)
const ballMaterial = new THREE.MeshStandardMaterial()
ballMaterial.roughness = 0.2
ballMaterial.metalness = 0.8
ballMaterial.normalMap = normalMap

const ball = new THREE.Mesh(sphereGeo, ballMaterial)
scene.add(ball)

// Lights
const pointLight = new THREE.AmbientLight(0xffffff, 0.5)
pointLight.position.set(2, 3, 4)

const lightIntensity = 10

const leftPointLight = new THREE.PointLight(0xEE3224, lightIntensity)
leftPointLight.position.set(-6.36, -9.17, -8.96)

scene.add(leftPointLight)

const rightPointLight = new THREE.PointLight(0x008080, lightIntensity)
rightPointLight.position.set(10, 10, -7.01)

scene.add(rightPointLight)

// animation events
document.addEventListener('mousemove', OnMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function OnMouseMove(event) {
    mouseY = (event.clientY - windowY)
    mouseX = (event.clientX - windowX)
}

document.addEventListener('scroll', OnScroll)

function OnScroll(event) {
    sphere.position.z += window.scroll.y * 0.001;
}



// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Renderer gets updated each time window is resized
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

// Renderer gets updated each time window is resized
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

// //controls
// const controls = new OrbitControls(camera, canvas)

// controls.enableZoom = false;
// controls.enableDamping = true

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    // mesh.position.y = Math.sin(elapsedTime) *0.1
    // boxMesh.position.z = Math.sin(elapsedTime) * 1

    // controls.update()
    // controls.enableDamping = true
    ball.rotation.y = 1 * elapsedTime
    ball.rotation.y += .5 * (targetX - ball.rotation.y)
    ball.rotation.x += .05 * (targetY - ball.rotation.x)
    ball.position.z += -.25 * (targetY - ball.rotation.x)
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
};

tick()