import {Card, Flex, Metric, ProgressBar, Text} from "@tremor/react";
import {toJpeg} from "html-to-image";
import {useCallback, useRef} from "react";
import {Options} from "html-to-image/es/types";

function App() {
    const ref = useRef<HTMLDivElement>(null)
    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        const options: Options = {
            cacheBust: true,
            pixelRatio: 20,
        };
        toJpeg(ref.current, options)
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'random.jpeg'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])
    return (
        <>
            <div ref={ref} style={{height: 398, width: 398}} className="bg-slate-100 grid grid-rows-0 place-content-center h-48">
                <Card className="max-w-xs">
                    <Text>Sales</Text>
                    <Metric>$ 71,465</Metric>
                    <Flex className="mt-4">
                        <Text>32% of annual target</Text>
                        <Text>$ 225,000</Text>
                    </Flex>
                    <ProgressBar value={32} className="mt-2"/>
                </Card>

            </div>
            <button className="mt-4 border-2 py-2 px-4 border-blue-400 rounded-lg" onClick={onButtonClick}>Download
            </button>
        </>
    )
}

export default App
