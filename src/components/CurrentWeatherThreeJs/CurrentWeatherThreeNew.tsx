import { Canvas } from "@react-three/fiber"
import React, { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CurrentWeatherStore, currentWeatherStore } from "../CurrentWeater/CurrentWeatherStore.tsx";
import { observer } from "mobx-react-lite";

const CurrentThree = observer((props) => {


    useEffect(() => {
        currentWeatherStore.getForecastWeather()
    }, [])
    const canvasRef = useRef(null);
   
    useEffect(() => {
       
        // Создание сцены, камеры и рендерера
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Создание геометрии и материалов для куба
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const materials = [];

        // Загрузка текстур изображений и создание текстур для каждой грани куба
        const textureLoader = new THREE.TextureLoader();
        const promises = currentWeatherStore?.forecast?.map(data => textureLoader.loadAsync(data.icon));

        Promise.all(promises)
            .then(iconTextures => {
                currentWeatherStore?.forecast?.forEach((data, index) => {
                    const canvasTexture = createTextCanvas(data.date, iconTextures[index], data?.avgtemp_c);
                    materials.push(new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvasTexture) }));
                });

                // Создание куба и добавление его в сцену
                const controls = new OrbitControls(camera, renderer.domElement);
                const cube = new THREE.Mesh(geometry, materials);
                scene.add(cube);

                // Позиционирование камеры
                camera.position.z = 5;

                // Рендеринг сцены
                const animate = () => {
                    requestAnimationFrame(animate);
                    //   cube.rotation.x += 0.01;
                    //   cube.rotation.y += 0.01;
                    renderer.render(scene, camera);
                };
                animate();
            })
            .catch(error => console.error('Error loading textures:', error));

        // Отчистка сцены при размонтировании компонента
        return () => {
            try {
                scene?.dispose();
            }
            catch { }
        };
    }, [currentWeatherStore?.forecast]);
    const createTextCanvas = (date, iconTexture, temperature) => {
        // Функция createTextCanvas
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

        // Иконка
        context.drawImage(iconTexture.image, canvas.width / 2 - 16, canvas.height / 4 + 20, 32, 32);
        // Температура
        context.font = '16px Arial';
        context.fillStyle = 'black';
        context.fillText(temperature + "°C", canvas.width / 2, canvas.height / 4 + 70);

        return canvas;
    };




    return (
        <canvas ref={canvasRef} />


    )
})
export default CurrentThree;