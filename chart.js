function drawChart(data, element, config) {
  const chart = document.getElementById("chart");
  chart.innerHTML = '';

  const rows = data.tables.DEFAULT;
  if (!rows.length) return;

  const values = rows[0].map(Number);
  const maxValue = Math.max(...values);

  const colors = getColors(config, values.length);

  values.forEach((value, index) => {
    const barContainer = document.createElement("div");
    barContainer.className = "bar";

    const bar = document.createElement("div");
    bar.className = "bar-rect";
    bar.style.height = `${(value / maxValue) * 100}%`;
    bar.style.background = colors[index];

    if (config.options.showLabels) {
      const label = document.createElement("div");
      label.className = "bar-label";
      label.textContent = value;
      barContainer.appendChild(label);
    }

    barContainer.appendChild(bar);
    chart.appendChild(barContainer);

    if (index < values.length - 1) {
      const arrow = document.createElement("div");
      arrow.className = "arrow";
      arrow.innerHTML = '➡️';
      chart.appendChild(arrow);
    }
  });
}

function getColors(config, count) {
  if (config.options.colorScheme === 'single') {
    return Array(count).fill(config.options.barColor);
  } else if (config.options.colorScheme === 'gradient') {
    return Array.from({ length: count }, (_, i) => {
      const ratio = i / (count - 1);
      return `hsl(${240 - 240 * ratio}, 70%, 60%)`;
    });
  } else {
    const palette = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#AB47BC'];
    return Array(count).fill(null).map((_, i) => palette[i % palette.length]);
  }
}

looker.plugins.visualizations.add({
  id: "youtube-funnel",
  label: "YouTube Video Funnel",
  create: function(element, config) {
    element.innerHTML = "<div id='chart'></div>";
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    drawChart(data, element, config);
    doneRendering();
  }
});
