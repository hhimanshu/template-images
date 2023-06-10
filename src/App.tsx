import {Card, Flex, Metric, ProgressBar, Text} from "@tremor/react";
import {toJpeg} from "html-to-image";
import {useCallback, useRef} from "react";

function App() {
    const ref = useRef<HTMLDivElement>(null)
    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toJpeg(ref.current, {cacheBust: true, pixelRatio: 50})
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'my-image-name.png'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])
    return (
        <>
            <Card className="max-w-xs" ref={ref}>
                <Text>Sales</Text>
                <Metric>$ 71,465</Metric>
                <Flex className="mt-4">
                    <Text>32% of annual target</Text>
                    <Text>$ 225,000</Text>
                </Flex>
                <ProgressBar value={32} className="mt-2"/>
            </Card>
            <button onClick={onButtonClick}>Download</button>
        </>
    )
}

export default App
