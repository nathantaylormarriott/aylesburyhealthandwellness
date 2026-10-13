export async function submitNetlifyForm(formName: string, fields: Record<string, string>) {
  const body = new URLSearchParams({ 'form-name': formName, ...fields });
  const response = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  return response.ok;
}
