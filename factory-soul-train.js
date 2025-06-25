// factory-soul-train.js
// Factory Soul Training Script for Synesthetic Music App
// See README-factory-soul.md for instructions and dataset format

(async function() {
  // Load TensorFlow.js
  if (typeof tf === 'undefined') {
    await new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.15.0/dist/tf.min.js';
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }

  // Helper: Load CSV or JSON
  async function loadDataset(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        if (file.name.endsWith('.json')) {
          resolve(JSON.parse(text));
        } else if (file.name.endsWith('.csv')) {
          const rows = text.split('\n').filter(Boolean);
          const data = rows.map(row => {
            const parts = row.split(',');
            return {
              features: parts.slice(0, 8).map(Number),
              label: parts[8].trim()
            };
          });
          resolve(data);
        } else {
          reject('Unsupported file type');
        }
      };
      reader.readAsText(file);
    });
  }

  // Helper: Get all emotion keys (update as needed)
  const emotionKeys = [
    'joy','sadness','anger','fear','surprise','disgust','nostalgia','awe','determination','serenity','passion','melancholy'
  ];

  // UI: File input
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv,.json';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const dataset = await loadDataset(file);
    const features = dataset.map(d => d.features);
    const labels = dataset.map(d => {
      const arr = Array(emotionKeys.length).fill(0);
      const idx = emotionKeys.indexOf(d.label);
      if (idx >= 0) arr[idx] = 1;
      return arr;
    });
    // Build model
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [8], units: 24, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 24, activation: 'relu' }));
    model.add(tf.layers.dense({ units: emotionKeys.length, activation: 'softmax' }));
    model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });
    // Train
    await model.fit(tf.tensor2d(features), tf.tensor2d(labels), { epochs: 40 });
    // Save weights
    await model.save('downloads://factory-soul-weights');
    alert('Factory soul trained and weights downloaded!');
  };
  document.body.appendChild(input);
  input.click();
})();
