import { useState, ChangeEvent, FormEvent } from "react"
import { countries } from "../../data/countries"
import style from './Form.module.css'
import type { SearchType } from "../../types"
import Alert from "../Alert/Alert"

type FromProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

const Form = ({fetchWeather} : FromProps) => {
    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })
    const [alert, setAlert] = useState('')

    const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios')
            return
        }

        fetchWeather(search)
    }

    return (
        <form 
            className={style.form}
            onSubmit={handleSubmit}
        >
            {alert && <Alert>{alert}</Alert>}
            <div className={style.field}>
                <label htmlFor="city">Ciudad</label>
                <input 
                    id="city"
                    type="text" 
                    name="city"
                    placeholder="Ciudad"
                    value={search.city}
                    onChange={handleChange}
                />
            </div>

            <div className={style.field}>
                <label htmlFor="country">País</label>
                <select
                    id="country"
                    value={search.country}
                    name="country"
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un país --</option>
                    {countries.map(country => (
                        <option 
                            key={country.code}
                            value={country.code}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <input className={style.submit} type="submit" value="Consultar Clima" />
        </form>
    )
}

export default Form