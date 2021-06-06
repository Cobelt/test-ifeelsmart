import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'
import { ErrorBoundary, Grid, Element } from 'react-muejs'
import { InputText, InputSelect } from 'inputs-muejs'
import axios from 'axios'

export default function App() {
    // COULD DO A CONTEXT HERE (used states because there is
    // only 1 page and no transimission to children)
    const [currencies, setCurrencies] = useState({})
    const [currenciesError, setCurrenciesError] = useState(null)

    useEffect(() => {
        axios
            .get(
                `${process.env.BASE_URL}/list?access_key=${process.env.API_KEY}`
            )
            .then(({ data }) => setCurrencies(data?.currencies))
            .catch(error => setCurrenciesError(error))
    }, [])

    const { handleChange, watch, errors, ...rest } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'firstError',
    })
    const onChange = values => console.log({ values })

    const form = { errors, ...rest }

    return (
        <form onChange={handleChange(onChange)}>
            {currenciesError && (
                <h3 className='text-center'>
                    Erreur lors de l'obtention des monnaies disponibles :
                    {JSON.stringify(currenciesError)}
                </h3>
            )}
            <Grid
                className='md-:mh-6vw lg+:mh-10vw pv-2vw'
                columnsTemplate='repeat(3, 1fr)'
                gap='24px'
            >
                <InputText
                    {...form}
                    row={1}
                    height={2}
                    label='Dollars'
                    className='align-self-center'
                    name='toConvert'
                    placeholder='Montant à convertir'
                    type='number'
                />

                <InputSelect
                    {...form}
                    row={1}
                    label='Convertir en'
                    name='convertTo1'
                    placeholder='Choisissez une monnaie de conversion'
                    options={currencies}
                />

                <Element row={1}>Résultat 1 :</Element>

                <InputSelect
                    {...form}
                    row={2}
                    label='Convertir en'
                    name='convertTo2'
                    placeholder='Choisissez une monnaie de conversion'
                    options={currencies}
                />

                <Element row={2}>Résultat 2 :</Element>
            </Grid>
        </form>
    )
}

ReactDOM.render(
    <ErrorBoundary fallback='Houston, on a un problème' showDetails>
        <App />
    </ErrorBoundary>,
    document.getElementById('root')
)
