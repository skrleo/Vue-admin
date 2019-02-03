<template>
    <div>
        <el-upload
            :class="disabled ? 'hideAdd' : 'showAdd'"
            ref="myImgUpload"
            list-type="picture-card"
            :multiple="limit > 1"
            :disabled="disabled"
            :file-list="fileList"
            :accept="accept"
            :limit="limit"
            :on-exceed="onExceed"
            :action="action"
            :data="params"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :on-remove="onRemove"
            :on-error="onError"
            :on-preview="onPreview"
            :with-credentials="true">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div v-if='tip' class="tip">{{tip}}</div>
    </div>
</template>
 
<script>
    export default {
        props: {
            action: {
                type: String,
                default: `${window.baseUrl}web/upload/getAvatarUploadInfo`
            },
            value: {
                type: String,
                default: ''
            },
            fileList: null,
            isEdit: {
                type: Boolean,
                default: false
            },
            tip: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            // 限制上传数量，默认是1张
            limit: {
                type: Number,
                default: 1
            },
            // 限制上传大小，默认是5M
            maxsize: {
                type: Number,
                default: 5
            },
            // 限制上传文件格式，默认是1 - 图片
            // 文件类型：1：图片(.jpg/.png) ；2:so文件/txt文件上传（.so/.txt）；3：provision文件上传（.mobileprovision)
            fileType: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                params: {
                    'fileType': 1,
                    'fileName': 'default.jpg'
                },
                dialogImageUrl: '',
                dialogVisible: false,
                accept: ''
            }
        },
        created() {
            switch (this.fileType) {
            case 1:
                this.accept = 'image/*'
                break
            default:
                this.accept = '*'
            }
        },
        methods: {
            uploadAliyun(res, file) {
                if (res.code === '000') {
                    let objectName = res.data.key
                    let OSS = require('ali-oss')
                    let client = new OSS({
                        region: res.data.regionId,
                        accessKeyId: res.data.accessKeyId,
                        accessKeySecret: res.data.accessKeySecret,
                        stsToken: res.data.securityToken,
                        bucket: res.data.bucket
                    })
                    const put = async() => {
                        try {
                            let result = await client.put(objectName, file.raw)
                            if (result.res.statusCode === 200) {
                                console.log('上传阿里云成功')
                                // this.$message.success('上传成功')
                            } else {
                                this.$message.error('上传阿里云失败')
                            }
                        } catch (e) {
                            this.$message.error(e)
                        }
                    }
                    put()
                } else {
                    this.$message.error(res.message)
                }
            },
            clearFiles () {
                this.$refs.myImgUpload.clearFiles()
            },
            beforeUpload(file) {
                this.params.fileName = file.name
                const isJPG = file.type === 'image/jpeg'
                const isPNG = file.type === 'image/png'
                const isRightSize = file.size / 1024 / 1024 < this.maxsize
                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
                }
                if (!isRightSize) {
                    this.$message.error('上传图片大小不能超过最大限制！')
                }
                return (isJPG || isPNG) && isRightSize
            },
            onSuccess(res, file, fileList) {
                this.$message.success('上传成功')
                let val = ''
                fileList.forEach(item => {
                    if (val !== '') {
                        val += ','
                    }
                    if (item.response) {
                        val += item.response.data.downloadPath
                    } else {
                        val += item.url
                    }
                })
                this.$emit('input', val)
                this.uploadAliyun(res, file)
            },
            onPreview(file) {
                this.dialogImageUrl = file.url
                this.dialogVisible = true
            },
            onExceed(files, fileList) {
                this.$message({
                    message: '上传数量超出最大限制！',
                    type: 'warning'
                })
            },
            onRemove(res, fileList) {
                let val = ''
                fileList.forEach(item => {
                    if (val !== '') {
                        val += ','
                    }
                    if (item.response) {
                        val += item.response.data.downloadPath
                    } else {
                        val += item.url
                    }
                })
                this.$emit('input', val)
            },
            onError(err) {
                console.log('this is onError:\n', err)
            }
        }
    }
</script>
 
<style lang='less' scope>
    .tip {
        color: #606266;
        font-size: 12px;
    }
    .hideAdd {
        .el-upload--picture-card {
            display: none;
        }
    }
    .showAdd {
        .el-upload--picture-card {
            display: block;
        }
    }
</style>
