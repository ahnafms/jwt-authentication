import Cors from 'cors'

const cors = Cors({
  methods: ['GET','POST'] 
})

export default cors(handler)
