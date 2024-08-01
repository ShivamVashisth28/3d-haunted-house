import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Sky } from 'three/addons/objects/Sky.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader()

// Floor
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg')
const floorArmTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg')

floorColorTexture.colorSpace = THREE.SRGBColorSpace // have to do with color textures always

floorColorTexture.repeat.set(8,8)
floorArmTexture.repeat.set(8,8)    
floorNormalTexture.repeat.set(8,8)
floorDisplacementTexture.repeat.set(8,8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorArmTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorArmTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

// Wall
const wallColorTexture = textureLoader.load('./wall/textures/castle_brick_broken_06_diff_1k.jpg')
const wallArmTexture = textureLoader.load('./wall/textures/castle_brick_broken_06_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./wall/textures/castle_brick_broken_06_nor_gl_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace // have to do with color textures always

// Roof

const roofColorTexture = textureLoader.load('./roof/textures/roof_slates_02_diff_1k.jpg')
const roofArmTexture = textureLoader.load('./roof/textures/roof_slates_02_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('./roof/textures/roof_slates_02_nor_gl_1k.jpg')

roofColorTexture.colorSpace = THREE.SRGBColorSpace // have to do with color textures alroof

roofColorTexture.repeat.set(3,1)
roofArmTexture.repeat.set(3,1)
roofNormalTexture.repeat.set(3,1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofArmTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping


// Bush

const bushColorTexture = textureLoader.load('./bush/textures/leaves_forest_ground_diff_1k.jpg')
const bushArmTexture = textureLoader.load('./bush/textures/leaves_forest_ground_arm_1k.jpg')
const bushNormalTexture = textureLoader.load('./bush/textures/leaves_forest_ground_nor_gl_1k.jpg')

bushColorTexture.colorSpace = THREE.SRGBColorSpace // have to do with color textures alroof

bushColorTexture.repeat.set(2,1)
bushArmTexture.repeat.set(2,1)
bushNormalTexture.repeat.set(2,1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushArmTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping

// Grave

const graveColorTexture = textureLoader.load('./grave/textures/plastered_stone_wall_diff_1k.jpg')
const graveArmTexture = textureLoader.load('./grave/textures/plastered_stone_wall_arm_1k.jpg')
const graveNormalTexture = textureLoader.load('./grave/textures/plastered_stone_wall_nor_gl_1k.jpg')

graveColorTexture.colorSpace = THREE.SRGBColorSpace // have to do with color textures alroof

graveColorTexture.repeat.set(0.3,0.4)
graveArmTexture.repeat.set(0.3,0.4)
graveNormalTexture.repeat.set(0.3,0.4)


// Door

const doorColorTexture = textureLoader.load('./door/color.jpg')
const doorAphaTexture = textureLoader.load('./door/apha.jpg')
const doorAmbientOcculsionTexture = textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./door/height.jpg')
const doorNormalTexture = textureLoader.load('./door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

/**
 * House
 */
// floor 
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap:floorAlphaTexture, // for using alphamap u have to make the object transparent
        transparent:true,
        map: floorColorTexture,
        aoMap: floorArmTexture,
        roughnessMap: floorArmTexture,
        metalnessMap: floorArmTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale:0.3,
        displacementBias: -0.2
    })
)

floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

// House container
const house = new THREE.Group()
scene.add(house)



// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({
        map:wallColorTexture,
        aoMap:wallArmTexture,
        roughnessMap: wallArmTexture,
        metalnessMap: wallArmTexture,
        normalMap: wallNormalTexture

    })
)

walls.position.y = 2.5/2
house.add(walls)



// roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1.5,4),
    new THREE.MeshStandardMaterial({
        map:roofColorTexture,
        aoMap:roofArmTexture,
        metalnessMap:roofArmTexture,
        roughnessMap:roofArmTexture,
        normalMap: roofNormalTexture
    })
)
roof.position.y = 2.5 + 1.25/2
roof.rotation.y = Math.PI * 0.25
house.add(roof)



// door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2,2.2,100,100),
    new THREE.MeshStandardMaterial({
        map:doorColorTexture,
        transparent:true,
        aoMap:doorAmbientOcculsionTexture,
        metalnessMap:doorMetalnessTexture,
        roughnessMap:doorRoughnessTexture,
        normalMap:doorNormalTexture,
        displacementMap:doorHeightTexture,
        displacementBias: -0.04,
        displacementScale: 0.15
    }),
)

door.position.y = 1
door.position.z = 2 + 0.01

house.add(door)


// bushes
const bushGeometry = new THREE.SphereGeometry(1,16,16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color:'#ccffcc',
    map:bushColorTexture,
    aoMap:bushArmTexture,
    metalnessMap:bushArmTexture,
    roughnessMap:bushArmTexture,
    normalMap:bushNormalTexture
})

const bush1 = new THREE.Mesh(
    bushGeometry, 
    bushMaterial
)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set( 0.8, 0.2, 2.2)
bush1.rotation.x = - 0.75 // to remove the wierd shape coming on top of the sphere


const bush2 = new THREE.Mesh(
    bushGeometry, 
    bushMaterial
)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = - 0.75 

const bush3 = new THREE.Mesh(
    bushGeometry, 
    bushMaterial
)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = - 0.75 

const bush4 = new THREE.Mesh(
    bushGeometry, 
    bushMaterial
)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set( -1, 0.05, 2.6)
bush4.rotation.x = - 0.75 

house.add(bush1, bush2, bush3, bush4)


// Grave
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2   )
const graveMaterial = new THREE.MeshStandardMaterial({
    map:graveColorTexture,
    aoMap:graveArmTexture,
    metalnessMap:graveArmTexture,
    roughnessMap:graveArmTexture,
    normalMap:graveNormalTexture
})

const graves = new THREE.Group()
scene.add(graves)

for(let i=0; i<30 ;i++)
{

    const angle = Math.random() * Math.PI * 2
    const radius = 3 + (Math.random() * 4)
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    // mesh 
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.x = x
    grave.position.y = Math.random() * 0.4
    grave.position.z = z

    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4

    // add to grave group
    graves.add(grave)
}



/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)


/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Shadows
 */
// Renderer
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Cast and Recieve
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

// for graves we will use the graves group as we cannot access the individual element

for(const grave of graves.children){
    grave.castShadow = true
    grave.receiveShadow = true
}

// Mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

/**
 * Sky
 */

const sky = new Sky()
sky.scale.set(100,100,100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

/**
 * Fog
 */
// scene.fog = new THREE.Fog('#ff0000', 10, 13)  color , near , far
// near --> how far away from the camera does the fog start
// far --> how far awaty from the camera will the fog be fully opaque

scene.fog = new THREE.FogExp2('#02343f', 0.1)  
// color , density


/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghost
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.sin(ghost1Angle) * 4
    ghost1.position.z = Math.cos(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)

    const ghost2Angle = - elapsedTime * 0.38
    ghost2.position.x = Math.sin(ghost2Angle) * 6
    ghost2.position.z = Math.cos(ghost2Angle) * 6
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)


    const ghost3Angle = elapsedTime * 0.23
    ghost3.position.x = Math.sin(ghost3Angle) * 5
    ghost3.position.z = Math.cos(ghost3Angle) * 5
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()