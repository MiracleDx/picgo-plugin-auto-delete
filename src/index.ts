import picgo from 'picgo'
import fs from 'fs'

export = (ctx: picgo) => {
    const register = () => {
        ctx.helper.afterUploadPlugins.register('delete', {
            handle: function (ctx) {
                // 获取输入数组
                let input: any[] = ctx.input
                // 文件路径
                let file = input[0]
                ctx.log.info(`file is ${file}`)
                fs.unlinkSync(file)

                let message = `delete ${file}`
                if (!fs.existsSync(file)) {
                    ctx.log.success(`${message} success`)
                } else {
                    ctx.log.warn(`${message} failure`)
                }

                ctx.emit('notification', {
                    title: 'auto delete',
                    body: `delete ${file} success`,
                    text: ''
                })
            }
        })
    }
    return {
        register
    }
}
