import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'
import { ErrorBoundary, Grid, Element } from 'react-muejs'
import { InputText, InputSelect } from 'inputs-muejs'

export default function App() {
    const { handleSubmit, watch, errors, ...rest } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'firstError',
    })
    const onSubmit = values => console.log({ values })

    const form = { errors, ...rest }

    const OPTIONS = {}

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    options={OPTIONS}
                />

                <Element row={1}>Résultat 1 :</Element>

                <InputSelect
                    {...form}
                    row={2}
                    label='Convertir en'
                    name='convertTo2'
                    placeholder='Choisissez une monnaie de conversion'
                    options={OPTIONS}
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
