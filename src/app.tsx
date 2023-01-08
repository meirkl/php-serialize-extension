import { useState } from 'preact/hooks';
import { serialize, unserialize, isSerialized } from './php-serialize';
import Textarea from './textarea';
import isJSON from './utils/is-json';

export function App() {
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState('');

    const serializeHandler = () => {
        try {
            if (isJSON(inputText)) {
                const obj = JSON.parse(inputText);
                setResult(serialize(obj));
            } else {
                setResult(serialize(inputText));
            }
        } catch (error) {
            console.log(error);
            // show err
        }
    };

    const unserializeHandler = () => {
        try {
            if (isSerialized(inputText)) {
                const unserialized = unserialize(inputText);
                if (typeof unserialized === 'object') {
                    setResult(JSON.stringify(unserialized));
                } else {
                    setResult(unserialized);
                }
            }
        } catch (error) {
            console.log(error);
            // show err
        }
    };

    const clearHandler = () => {
        setResult('');
        setInputText('');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result).then();
    };

    return (
        <>
            <Textarea
                autoFocus
                value={inputText}
                onChange={(e) =>
                    setInputText((e.target as HTMLInputElement).value)
                }
            />
            <div>
                <button onClick={serializeHandler}>Serialize</button>
                <button onClick={unserializeHandler}>Unserialize</button>
                <button onClick={clearHandler}>Clear</button>
                <button onClick={copyToClipboard}>Copy result</button>
            </div>
            <Textarea
                value={result}
                onChange={(e) =>
                    setResult((e.target as HTMLInputElement).value)
                }
            />
        </>
    );
}
