import fetch from 'node-fetch'

const key = 'REPLACE_ME_WITH_YOUR_KEY' // sk-proj-...

async function test() {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{role: 'user', content: 'Translate "Hello" to Korean'}]
      })
    })
    const data = await res.json()
    console.log(JSON.stringify(data, null, 2))
  } catch (err) {
    console.error(err)
  }
}

test()
