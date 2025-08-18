import { ChangeEvent, CSSProperties, InputHTMLAttributes } from 'react';

import classes from './NumberInput.module.css';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    label: string;
    value: number;
    setValue: (amount: number) => void;
    style?: CSSProperties | undefined;
}

const TextInput = (props: TextInputProps) => {
    const { className, label, value, setValue, style, ...otherProps } = props;

    const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target?.value);
        if (newValue) {
            setValue(newValue);
        }
    };

    // Select all by default to allow for easier changing of numeric value
    const onInputFocus = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.select();
    };

    return (
        <div className={`${classes.container} ${className}`} style={style}>
            {label && <span>{label}</span>}
            <input {...otherProps} type="number" value={value} onChange={onTextChange} onFocus={onInputFocus} />
        </div>
    );
};

export default TextInput;
