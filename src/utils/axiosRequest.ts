import axios, { Method, AxiosRequestConfig, isAxiosError } from 'axios'
import ErrorResponse from './ErrorResponse'

export const axiosRequest = async <T, R = any>(method: Method, url: string, data?: T, token?: string): Promise<R> => {
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }

    try {
        const response = await axios({
            method,
            url,
            data,
            ...config,
        })

        return response.data
    } catch (error: unknown) {
        if (!isAxiosError(error)) throw error
        if (!error.response) throw new ErrorResponse(error.message, 500)
        throw new ErrorResponse(error.response.data.error.message, error.response.status)
    }
}
