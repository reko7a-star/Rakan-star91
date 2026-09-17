import * as vscode from 'vscode';
import markdownItContainer from 'markdown-it-container';
import emoji from 'markdown-it-emoji';

export function activate(context: vscode.ExtensionContext) {
  return {
    extendMarkdownIt(md: any) {
      md.use(markdownItContainer, 'alert', {
        validate: (params: string) => params.trim() === 'alert',
        render: (tokens: any[], idx: number) =>
          tokens[idx].nesting === 1 ? '<div class="alert">' : '</div>'
      });

      md.use(markdownItContainer, 'spoiler', {
        marker: '?',
        validate: (params: string) => params.trim().startsWith('spoiler'),
        render: (tokens: any[], idx: number) => {
          if (tokens[idx].nesting === 1) {
            const title = tokens[idx].info.trim().replace(/^spoiler\s*/, '') || 'Spoiler';
            const safeTitle = md.utils.escapeHtml(title.replace(/^['"]|['"]$/g, ''));
            return `<div class="spoiler"><details><summary>${safeTitle}</summary>`;
          }
          return '</details></div>';
        }
      });

      md.use(emoji);
      return md;
    }
  };
}

export function deactivate() {}
