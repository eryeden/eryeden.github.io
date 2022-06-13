import * as React from "react";
import { Engine, RenderClones, Walls, Circle } from "react-matter-js";
import BrowserOnly from '@docusaurus/BrowserOnly';
import useIsBrowser from '@docusaurus/useIsBrowser';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';




const App = () => {

    const width = 10;//window.innerWidth;
    const height = 20; //window.innerHeight;
    const circleCount = 50;
    const cirlceSize = height * 0.05;

    const renderCircles = () => {
        return [...Array(circleCount).keys()].map(num => (
            <Circle key={num} clone x={300} y={100} radius={cirlceSize} />
        ));
    };

    return (
        <Engine options={{}}>
            <RenderClones
                enableMouse
                options={{
                    width,
                    height,
                    background: "transparent",
                    wireframeBackground: "transparent",
                    visible: false
                }}
            >
                <Walls x={0} y={0} width={width} height={height} wallWidth={1} />
                {renderCircles()}
            </RenderClones>
        </Engine>
    );

};

export default App;