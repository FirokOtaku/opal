
import Axios from 'axios'
import qs from 'qs'

/**
 * 使用这个类, 你需要安装 axios 和 qs 库.
 * @see https://github.com/FirokOtaku/Topaz/blob/master/src/main/java/firok/topaz/spring/CodeRet.java
 * @author Firok
 * */
class CodeRetNetwork
{
    /**
     * @param {CreateAxiosDefaults} axiosConfig
     * */
    constructor(axiosConfig)
    {
        this.axios = Axios.create(axiosConfig ?? {})
        this.axios.interceptors.request.use(
            config => {
                if (config != null && config.params != null) {
                    config.url += '?' + qs.stringify(config.params, { indices: false })
                    config.params = undefined
                }
                return config
            },
            error => Promise.reject(error)
        )
    }

    /**
     * 请求一个返回 {@link firok.topaz.spring.CodeRet} 格式的接口
     * @param {any} config
     * @param {(data: any) => void} onSuccess
     * @param {(msg: string, code: number, error: any) => void} onFail
     */
    async request(
        config,
        onSuccess,
        onFail,
    )
    {
        let ret
        try
        {
            const response = await this.axios.request(config)
            ret = response.data
        }
        catch (error)
        {
            onFail(null, null, error)
        }

        if (ret.success) onSuccess(ret.data)
        else onFail(ret.msg, ret.code, null)
    }

    async get(config, onSuccess, onFail)
    {
        const configReal = Object.assign(config, { method: 'get' })
        return this.request(configReal, onSuccess, onFail)
    }
    async post(config, onSuccess, onFail)
    {
        const configReal = Object.assign(config, { method: 'post' })
        return this.request(configReal, onSuccess, onFail)
    }
    async put(config, onSuccess, onFail)
    {
        const configReal = Object.assign(config, { method: 'put' })
        return this.request(configReal, onSuccess, onFail)
    }
    async delete(config, onSuccess, onFail)
    {
        const configReal = Object.assign(config, { method: 'delete' })
        return this.request(configReal, onSuccess, onFail)
    }
}
