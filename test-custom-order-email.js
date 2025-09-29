const testCustomOrderSubmission = async () => {
  const testData = {
    name: "Test Customer",
    email: "test.customer@example.com",
    phone: "(555) 123-4567",
    description: "I would like a custom resin coaster set with embedded dried flowers, specifically lavender and baby's breath. I need 4 coasters, approximately 4 inches in diameter. I'd prefer purple and white colors to match my kitchen decor. This is for a housewarming gift, so I need them completed within 3 weeks. I can provide reference photos if needed.",
    timestamp: new Date().toISOString()
  }

  try {
    console.log('🧪 Testing Custom Order API...')
    console.log('📝 Test Data:', JSON.stringify(testData, null, 2))

    const response = await fetch('http://localhost:3000/api/custom-order/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    })

    console.log('📡 Response Status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Request failed:', errorText)
      return
    }

    const result = await response.json()
    console.log('✅ Success Response:', result)

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

// Run the test
testCustomOrderSubmission()