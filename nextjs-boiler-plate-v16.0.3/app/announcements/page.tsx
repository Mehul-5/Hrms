// @ts-nocheck
'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_ANNOUNCEMENTS } from '../../graphql/query/getAnnouncements';
import { CREATE_ANNOUNCEMENT } from '../../graphql/mutation/createAnnouncement';

export default function AnnouncementsPage() {
  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  // GraphQL Hooks
  const { data, loading, error } = useQuery(GET_ANNOUNCEMENTS, {
    fetchPolicy: 'network-only',
  });

  const [createAnnouncement, { loading: isSubmitting }] = useMutation(CREATE_ANNOUNCEMENT, {
    // Magic trick: Automatically refresh the announcements list after a successful post!
    refetchQueries: [{ query: GET_ANNOUNCEMENTS }], 
  });

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !author) return;

    try {
      await createAnnouncement({
        variables: { title, content, author },
      });
      // Clear the form on success
      setTitle('');
      setContent('');
      setAuthor('');
    } catch (err) {
      console.error("Failed to post announcement:", err);
      alert("Error posting announcement. Check console.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Company Announcements</h1>

        {/* --- CREATE ANNOUNCEMENT FORM --- */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Post a New Announcement</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Announcement Title" 
                className="border p-2 rounded w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input 
                type="text" 
                placeholder="Author Name" 
                className="border p-2 rounded w-full"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <textarea 
              placeholder="What do you want to share with the company?" 
              className="border p-2 rounded w-full h-24"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
              {isSubmitting ? 'Posting...' : 'Post Announcement'}
            </button>
          </form>
        </div>
        {/* -------------------------------- */}

        {/* --- ANNOUNCEMENTS LIST --- */}
        {loading && <div className="text-gray-500 animate-pulse">Loading latest news...</div>}
        {error && <div className="text-red-500 bg-red-50 p-4 rounded-md border border-red-200">Error: {error.message}</div>}

        <div className="space-y-6">
          {!loading && !error && data?.announcements?.nodes?.map((announcement: any) => (
            <div key={announcement.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-blue-700">{announcement.title}</h2>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {new Date(announcement.publishDate).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap mb-4">{announcement.content}</p>
              <div className="text-sm font-medium text-gray-500 border-t border-gray-100 pt-3">
                Posted by {announcement.author}
              </div>
            </div>
          ))}
        </div>
        {/* -------------------------------- */}
      </div>
    </div>
  );
}