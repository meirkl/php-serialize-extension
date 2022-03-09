import { useState } from 'preact/hooks';
import { serialize, unserialize, isSerialized } from './php-serialize';
import Textarea from './textarea';

export function App() {
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState('');

    const serializeHandler = () => {
        try {
            const obj = JSON.parse(inputText);
            if (!!obj && typeof obj === 'object') {
                setResult(serialize(obj));
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
                setResult(JSON.stringify(unserialized));
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
            <h1>PHP Serialize/Unserialize</h1>
            <div>
                <Textarea
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
            </div>
        </>
    );
}
