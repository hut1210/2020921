export default {
  data () {
    return {
      value: '',
      form: {
        date: '',
        options: [
        ],
        input: ``,
      },
      formAll:{
        keyword: '',
        pro_company:'',
        test_company: '',
        allData: '',
        add_time: '',
        end_time: ''
      },
      project_number:{
        company_list: [],
        abnormal_number: [],
        normal_number: []
      },
      plan_number:{
        plan_list: [],
        plan_abnormal_number: [],
        plan_normal_number: []
      },
    }
  },
  mounted () {
    this.getCompany()
    this.getList()
  },
  methods: {
    //公司
    getCompany() {
      this.$api.post(
        '/companytype',
        {},
        r => {
          if (r.errcode == 0) {
            this.form.options = r.data
          }
        },
        e => {
          //   self.$message.error(e.msg)
        }
      )
    },
    // 搜索获取列表
    getList(){
      let self = this
      self.formAll.add_time = self.formAll.allData[0]
      self.formAll.end_time = self.formAll.allData[1]
      self.$api.get(
        '/getnum',
        self.formAll,
        r =>{
            self.project_number = r.data.project_number;
            self.plan_number = r.data.plan_number;
            this.getNum()
            this.detection()
        }
      )
    },
    getNum () {
      let self = this;
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      var option = {
        color: ['#FCB72A', '#66CE90'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
          }
        },
        legend: {
          data: ['异常', '正常']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          //data: ['0', '100', '200', '300', '400', '500', '600'],
          splitLine: {
            show: true,
            lineStyle: {
              type: 'solid'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: self.project_number.company_list,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'solid'
            }
          }
        },
        series: [
          {
            name: '异常',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: self.project_number.abnormal_number,
          },
          {
            name: '正常',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: self.project_number.normal_number,
          }
        ]
      }
      myChart.setOption(option)
    },
    detection () {
      let self = this;
      let myChart = this.$echarts.init(document.getElementById('detection'))
      // 绘制图表
      var option = {
        color: ['#FCB72A', '#66CE90'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
          }
        },
        legend: {
          data: ['异常', '正常']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          data: ['0', '25', '50', '75', '100'],
          splitLine: {
            show: true,
            lineStyle: {
              type: 'solid'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: self.plan_number.plan_list,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'solid'
            }
          }
        },
        series: [
          {
            name: '异常',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: self.plan_number.plan_abnormal_number,
          },
          {
            name: '正常',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'insideRight'
            },
            data: self.plan_number.plan_normal_number
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
