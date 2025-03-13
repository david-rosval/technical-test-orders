import app from './app.js'
import { PORT } from './config.js'

const port = PORT ?? 3001

app.listen(port, () => console.log(`listening on port ${PORT}`))
