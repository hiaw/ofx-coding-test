import { useState } from 'react';
import DropDown from '../../Components/DropDown';
import ProgressBar from '../../Components/ProgressBar';
import Loader from '../../Components/Loader';
import NumberInput from '../../Components/NumberInput';

import { useAnimationFrame } from '../../Hooks/useAnimationFrame';

import classes from './Rates.module.css';

import CountryData from '../../Libs/Countries.json';
import countryToCurrency from '../../Libs/CountryCurrency.json';
import { calculateExchangeAmount, calculateExchangeAmountWithOFXMarkup } from '../../Utils/calculator';

let countries = CountryData.CountryCodes;

const Rates = () => {
    const [fromCurrency, setFromCurrency] = useState('AU');
    const [toCurrency, setToCurrency] = useState('US');

    const [fromAmount, setFromAmount] = useState<number | undefined>(0);
    const [toAmount, setToAmount] = useState<number | undefined>(0);
    const [toOFXAmount, setToOFXAmount] = useState<number | undefined>(0);

    const [exchangeRate, setExchangeRate] = useState(0.7456);
    const [progression, setProgression] = useState(0);
    const [loading, setLoading] = useState(false);

    const Flag = ({ code }: { code: string }) => (
        <img alt={code || ''} src={`/img/flags/${code || ''}.svg`} width="20px" className={classes.flag} />
    );

    const fetchData = async () => {
        if (!loading) {
            setLoading(true);

            await new Promise((resolve) => setTimeout(resolve, 2000));

            setLoading(false);
        }
    };

    // Demo progress bar moving :)
    useAnimationFrame(!loading, (deltaTime) => {
        setProgression((prevState) => {
            if (prevState > 0.998) {
                fetchData();
                return 0;
            }
            return (prevState + deltaTime * 0.0001) % 1;
        });
    });

    const calculateAmounts = (amount: number | undefined) => {
        setFromAmount(amount);
        if (amount === undefined || amount === 0) {
            setToAmount(0);
            setToOFXAmount(0);
        } else {
            console.log('should not be here');
            setToAmount(calculateExchangeAmount(amount, exchangeRate));
            setToOFXAmount(calculateExchangeAmountWithOFXMarkup(amount, exchangeRate));
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.heading}>Currency Conversion</div>

                <div className={classes.rowWrapper}>
                    <div>
                        <DropDown
                            leftIcon={<Flag code={fromCurrency} />}
                            label={'From'}
                            selected={countryToCurrency[fromCurrency as keyof typeof countryToCurrency]}
                            options={countries.map(({ code }) => ({
                                option: countryToCurrency[code as keyof typeof countryToCurrency],
                                key: code,
                                icon: <Flag code={code} />,
                            }))}
                            setSelected={(key: string) => {
                                setFromCurrency(key);
                            }}
                            style={{ marginRight: '20px' }}
                        />
                        <NumberInput
                            label="From"
                            value={fromAmount}
                            setValue={calculateAmounts}
                            style={{ marginTop: '20px' }}
                        />
                    </div>

                    <div className={classes.exchangeWrapper}>
                        <div className={classes.transferIcon}>
                            <img src="/img/icons/Transfer.svg" alt="Transfer icon" />
                        </div>

                        <div className={classes.rate}>{exchangeRate}</div>
                    </div>

                    <div>
                        <DropDown
                            leftIcon={<Flag code={toCurrency} />}
                            label={'To'}
                            selected={countryToCurrency[toCurrency as keyof typeof countryToCurrency]}
                            options={countries.map(({ code }) => ({
                                option: countryToCurrency[code as keyof typeof countryToCurrency],
                                key: code,
                                icon: <Flag code={code} />,
                            }))}
                            setSelected={(key: string) => {
                                setToCurrency(key);
                            }}
                            style={{ marginLeft: '20px' }}
                        />
                        <NumberInput
                            label="To"
                            value={toAmount}
                            style={{ marginTop: '20px', marginLeft: '20px' }}
                            disabled
                        />
                        <NumberInput
                            label="To (OFX)"
                            value={toOFXAmount}
                            style={{ marginTop: '20px', marginLeft: '20px' }}
                            disabled
                        />
                    </div>
                </div>

                <ProgressBar
                    progress={progression}
                    animationClass={loading ? classes.slow : ''}
                    style={{ marginTop: '20px' }}
                />

                {loading && (
                    <div className={classes.loaderWrapper}>
                        <Loader width={'25px'} height={'25px'} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Rates;
