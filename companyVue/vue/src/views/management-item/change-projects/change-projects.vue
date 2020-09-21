<template>
    <div class="schedule-out-box">
        <div class="information">
            <div class="button">项目信息</div>
            <div class="information-center">
                <center>
                    <el-form ref="form" :model="form" label-position="right" label-width="180px">
                        <el-form-item label="项目名称:" prop="">
                            <div class="form-div">{{form.entryName}}</div>
                        </el-form-item>
                        <el-form-item label="产品名称:">
                            <div class="form-div">{{form.productNme}}</div>
                        </el-form-item>
                        <el-form-item label="产品版本号:">
                            <div class="form-div">{{form.editionName}}</div>
                        </el-form-item>
                        <el-form-item label="所属公司:">
                            <div class="form-div">{{form.company}}</div>
                        </el-form-item>
                        <el-form-item label="测试范围:">
                            <div class="form-div">
                                <label class="form-div-label"></label>
                                <span class="form-div-span">安全性</span>
                                <label class="form-div-label"></label>
                                <span class="form-div-span">渗透测试</span>
                                <label class="form-div-label"></label>
                                <span class="form-div-span">代码扫描</span>
                                <label class="form-div-label-no"></label>
                                <span class="form-div-span">安全防护方案测试</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="项目经理:">
                            <div class="form-div">{{form.manager}}</div>
                        </el-form-item>
                        <el-form-item label="联系方式:">
                            <div class="form-div">{{form.tel}}</div>
                        </el-form-item>
                        <el-form-item label="用户账号:">
                            <div class="form-div div-click" @click="open"><span class="form-label-span">{{form.email}}</span>(点击在线沟通)</div>
                        </el-form-item>
                    </el-form>
                </center>
            </div>
        </div>
        <div class="progress">
            <div class="button">检测进度</div>
            <div class="progress-center">
                <center>
                    <el-form ref="form" :model="form2" label-position="right" label-width="180px">
                        <el-form-item label="当前进度:">
                            <el-select v-model="form2.company" class="flex" placeholder="">
                            </el-select>
                            <el-select v-model="form2.company2" class="flex" placeholder="">
                            </el-select>
                        </el-form-item>
                        <el-form-item label="当前进度说明:">
                            <div class="form-div">{{form2.manager}}</div>
                        </el-form-item>
                        <el-form-item label="下一阶段送检准备工作:">
                            <div class="form-div">{{form2.tel}}</div>
                        </el-form-item>
                    </el-form>
                </center>
            </div>
        </div>
        <div class="exhibition">
            <div class="button">检测流程进度排程展示</div>
            <center>
              <el-timeline>
                <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :color="activity.color"
                placement="top"
                >
                <!-- :timestamp="activity.timestamp" -->
                <!-- {{activity.content}} -->
                    <div class="time-line" :style="{color:activity.color?activity.color:'red'}">
                        {{activity.timestamp}}
                    </div>
                    <div :style="{color:activity.color?activity.color:'red'}">
                        {{activity.content}}
                    </div>
                    <div :style="{color:activity.color?activity.color:'red'}">
                        {{activity.content2}}
                    </div>
                </el-timeline-item>
              </el-timeline>
            </center>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      flag: true,
      form: {
        entryName: '蒙东电力公司用户绑定积分推广活动系统开发',
        productNme: '蒙东电力公司用户绑定积分推广活动系统开发',
        editionName: ' V1.0.0',
        company: '北京中电普华信息技术有限公司',
        manager: '刘德华',
        tel: '13810296066',
        email: 'sm@aliyun.com'
      },
      form2: {
        entryName: '蒙东电力公司用户绑定积分推广活动系统开发',
        productNme: '刘德华',
        editionName: ' 15010268908',
        company: '新提测',
        company2: '延期',
        manager: '系统故障',
        tel: '整改工作',
        email: '一直出错'
      },
      activities: [
        {
          content: '提交测试',
          content2: '',
          timestamp: '2018-04-12 20:46',
          color: '#ccc'
        },
        {
          content: '材料审核',
          content2: '材料审批发现不符合标准需要补充材料',
          timestamp: '2018-04-03 20:46',
          color: '#ccc'
        },
        {
          content: '材料补充',
          content2: '补充材料已经提交',
          timestamp: '2018-04-03 20:46',
          size: 'large',
          color: '#ccc'
        },
        {
          content: '测试计划编制',
          content2: '',
          timestamp: '2018-04-03 20:46',
          color: '#ccc'
        },
        {
          content: '一轮环境搭建',
          content2: '',
          timestamp: '2018-04-03 20:46',
          color: '#66CE90'
        },
        {
          content: '一轮测试',
          content2: '一轮测试缺陷已出，请在规定时间内整改完毕',
          timestamp: '2018-04-03 20:46',
          color: '#666'
        },
        {
          content: '一轮整改',
          content2: '整改延期5个工作日',
          timestamp: '2018-04-03 20:46',
          color: '#666'
        },
        {
          content: '二轮环境搭建',
          content2: '',
          timestamp: '2018-04-03 20:46',
          color: '#666'
        },
        {
          content: '二轮测试',
          content2: '',
          timestamp: '2018-04-03 20:46',
          color: '#666'
        },
        {
          content: '测试报告',
          content2: '',
          timestamp: '2018-04-03 20:46',
          color: '#666'
        },
        {
          content: '测试完成',
          content2: '',
          timestamp: '2018-04-03 20:46',
          color: '#666'
        }
      ]
    }
  },
  methods: {
    open () {
      this.$message({
        message: '暂未开发,敬请期待',
        type: 'warning'
      });
    }
  }
};
</script>
<style lang="less" scoped >
.flex{
  width: 48%;
  display: inline-block;
}
.schedule-out-box {
  .information {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    padding: 20px;
    background: #fff;
    overflow: hidden;
    box-sizing: border-box;
    .information-center {
      center {
        width: 40%;
        margin: 0 auto;
        .el-form-item {
          margin-top: 15px;
        }
        .form-div {
          border: 1px solid rgba(237, 235, 235, 1);
          border-radius: 2px;
          text-align: left;
          padding: 0 15px;
          height: 40px;
          line-height: 40px;
          .form-label-span {
            color: #66ce90;
            padding-right: 20px;
          }
          .form-div-label {
            width: 5px;
            height: 5px;
            display: inline-block;
            border-radius: 50%;
            border: 3px solid #66ce90;
          }
          .form-div-label-no {
            width: 5px;
            height: 5px;
            display: inline-block;
            border-radius: 50%;
            border: 3px solid #ccc;
          }
        }
        .div-click {
          cursor: pointer;
        }
      }
    }
  }
  .progress {
    width: 100%;
    height: auto;
    padding: 20px;
    margin-bottom: 20px;
    background: #fff;
    overflow: hidden;
    box-sizing: border-box;
    .progress-center {
      center {
        width: 40%;
        margin: 0 auto;
        .el-form-item {
          margin-top: 15px;
        }
        .form-div {
          border: 1px solid rgba(237, 235, 235, 1);
          border-radius: 2px;
          text-align: left;
          padding: 0 15px;
          height: 40px;
          line-height: 40px;
          .form-label-span {
            color: #66ce90;
            padding-right: 20px;
          }
        }
        .div-click {
          cursor: pointer;
        }
      }
    }
  }
  .exhibition {
    width: 100%;
    height: auto;
    padding: 20px;
    margin-bottom: 20px;
    background: #fff;
    overflow: hidden;
    box-sizing: border-box;
    .button {
      width: 175px;
    }
    center {
      width: 40%;
      margin: 40px 0 0 50%;
      .active {
        color: #ccc;
      }
      .el-timeline {
        .el-timeline-item {
          text-align: left;
        }
        .time-line {
          position: absolute;
          left: -130px;
        }
      }
    }
  }
  .button {
    width: 100px;
    height: 30px;
    padding: 0 10px;
    margin: 0 auto;
    line-height: 30px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    background: rgba(252, 183, 42, 1);
    border-radius: 2px;
  }
}
</style>
