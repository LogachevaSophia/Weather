import { Canvas } from "@react-three/fiber"
import React, { useEffect } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CurrentWeatherStore, currentWeatherStore } from "../CurrentWeater/CurrentWeatherStore.tsx";
import { observer } from "mobx-react-lite";

const CurrentThree = observer((props) => {
    useEffect(() => {
        // currentWeatherStore.getCurrentWeather()
        currentWeatherStore.getForecastWeather()
    }, [])


    useEffect(() => {
        if (currentWeatherStore?.forecast?.length == 0) return;
       
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root")?.appendChild(renderer.domElement);

        // Создание куба
        const geometry = new THREE.BoxGeometry(3, 3, 3);
        const materials = [
            new THREE.MeshBasicMaterial({ color: 0xff0000, }), // Передняя грань
            new THREE.MeshBasicMaterial({ color: 0x00ff00, }), // Задняя грань
            new THREE.MeshBasicMaterial({ color: 0x0000ff, }), // Верхняя грань
            new THREE.MeshBasicMaterial({ color: 0xffff00, }), // Нижняя грань
            new THREE.MeshBasicMaterial({ color: 0xff00ff, }), // Левая грань
            new THREE.MeshBasicMaterial({ color: 0x00ffff, })  // Правая грань
        ];
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);
        // Добавление возможности вращения куба
        const controls = new OrbitControls(camera, renderer.domElement);
        camera.position.z = 5;

        // Рендеринг сцены
        function animate() {
            requestAnimationFrame(animate);
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        // Создание текстур с данными о погоде для каждой грани
        materials.forEach((data, index) => {
            const material = materials[index];
            createImageTexture("https:" + currentWeatherStore?.forecast[index]?.icon)
                .then(texture => {
                    console.log(texture)
                    const textTexture = new THREE.CanvasTexture(createTextCanvas(currentWeatherStore?.forecast[index]?.date, currentWeatherStore?.forecast[index]?.avgtemp_c, texture));
                    material.map = textTexture;
                    material.needsUpdate = true;
                })
                .catch(error => {
                    console.error('Error loading image:', error);
                });
        });

        // materials?.map((el, index) => {

        // const material = materials[index];
        // // const weather = currentWeatherStore?.forecast[index]?.date + " " + currentWeatherStore?.forecast[index]?.avgtemp_c + "°";
        // const textTexture = new THREE.CanvasTexture(createTextCanvas(currentWeatherStore?.forecast[index]?.date, currentWeatherStore?.forecast[index]?.avgtemp_c, currentWeatherStore?.forecast[index]?.icon));
        // material.map = textTexture;
        // material.needsUpdate = true;
        // })
        animate();
    }, [currentWeatherStore?.forecast])


    // Функция для создания текстур изображения
    const createImageTexture = (imageUrl) => {
        console.log(imageUrl)
        return new Promise((resolve, reject) => {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
                imageUrl,
                texture => resolve(texture),
                undefined,
                error => reject(error)
            );
        });
    }

    // Функция для создания текстур из текста
    const createTextCanvas = (date, temperature, icon) => {
        // console.log(date, temperature, icon)
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 256;

        // Фон
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Дата
        context.font = '16px Arial';
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.fillText(date, canvas.width / 2, canvas.height / 4);
        console.log("date = ")
        console.log(date)

        // Иконка
        context.drawImage(icon.image, canvas.width / 2 - 16, canvas.height / 4 + 20, 32, 32);

        // Температура
        context.font = '16px Arial';
        context.fillStyle = 'black';
        context.fillText(temperature + "°C", canvas.width / 2, canvas.height / 4 + 70);

        return canvas;

    }





    return (
        <></>

        // <Canvas children={undefined}>
        //     <ambientLight intensity={0.1}/>
        //     <pointLight position={[10,10,10]}/>
        //     <mesh  position={[2,1,0]}>
        //         <boxGeometry/>
        //         <meshStandardMaterial color="blue"/>
        //     </mesh>
        // </Canvas>

    )
})
export default CurrentThree;