'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  X, 
  Home, 
  Compass, 
  Bookmark, 
  MessageSquare, 
  Bell, 
  Settings, 
  LifeBuoy, 
  LogOut, 
  ArrowUpRight, 
  Edit2, 
  Check, 
  ArrowLeft, 
  Trash2, 
  Send, 
  Smartphone,
  ShieldAlert,
  VolumeX,
  Ban,
  EyeOff
} from 'lucide-react';

interface Profile {
  email: string;
  name: string;
  avatar: string;
  bio: string;
}

import { Post, Comment } from '@/types/post';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  apiBaseUrl: string;
  subscribedAuthors: string[];
  setSubscribedAuthors: (authors: string[]) => void;
  savedPostIds: string[];
  setSavedPostIds: (ids: string[]) => void;
  blockedAuthors: string[];
  setBlockedAuthors: (authors: string[]) => void;
  mutedAuthors: string[];
  setMutedAuthors: (authors: string[]) => void;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  activities: string[];
  addActivity: (message: string) => void;
  customPosts: Post[];
  setCustomPosts: (posts: Post[]) => void;
  reportedPostIds: string[];
  setReportedPostIds: (ids: string[]) => void;
}

export default function ProfileSidebar({ 
  isOpen, 
  onClose, 
  apiBaseUrl,
  subscribedAuthors,
  setSubscribedAuthors,
  savedPostIds,
  setSavedPostIds,
  blockedAuthors,
  setBlockedAuthors,
  mutedAuthors,
  setMutedAuthors,
  posts,
  setPosts,
  activities,
  addActivity,
  customPosts,
  setCustomPosts,
  reportedPostIds,
  setReportedPostIds
}: ProfileSidebarProps) {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Sub-view panel state
  const [activePanel, setActivePanel] = useState<'main' | 'subscriptions' | 'saved' | 'chat' | 'activity' | 'settings' | 'support' | 'signout' | 'app' | 'moderation'>('main');

  // Sign out / Signed in Simulation state
  const [isSignedIn, setIsSignedIn] = useState(true);

  // Chat Sub-view states
  const [selectedChatAuthor, setSelectedChatAuthor] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<string, { sender: string; text: string; time: string }[]>>({
    "SHOBIN SHEIKH": [
      { sender: "Shobin", text: "Hey Karan, thanks for following the Pulse of Profit Bulletin!", time: "10:15 AM" },
      { sender: "Shobin", text: "Do you have any thoughts on the M&M connector model update?", time: "10:16 AM" }
    ],
    "JAYANT MUNDHRA": [
      { sender: "Jayant", text: "Hello! I am preparing the data for our next post on ethanol blending.", time: "Yesterday" }
    ],
    "MICHAEL BURRY": [
      { sender: "Burry", text: "The housing bubble is larger than 2008. Everyone is blind.", time: "2 days ago" }
    ]
  });
  const [newChatMessage, setNewChatMessage] = useState('');

  // Settings sub-view states
  const [settingsNotify, setSettingsNotify] = useState(true);
  const [settingsDigest, setSettingsDigest] = useState(false);
  const [settingsDark, setSettingsDark] = useState(true);

  // Support sub-view states
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  // Local Toast inside sidebar
  const [sidebarToast, setSidebarToast] = useState<string | null>(null);

  const showSidebarToast = (msg: string) => {
    setSidebarToast(msg);
    setTimeout(() => setSidebarToast(null), 2500);
  };

  useEffect(() => {
    if (isOpen) {
      fetch(`${apiBaseUrl}/api/profile`)
        .then(res => res.json())
        .then(data => {
          setProfile(data);
          setNewName(data.name);
          setNewBio(data.bio);
        })
        .catch(err => {
          console.error("Error fetching profile:", err);
          const fallbackProfile = {
            name: "Karan",
            email: "techkaran401@gmail.com",
            avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Karan",
            bio: "Interested in financial markets, business analysis, and global economy updates."
          };
          setProfile(fallbackProfile);
          setNewName(fallbackProfile.name);
          setNewBio(fallbackProfile.bio);
        });
    }
  }, [isOpen, apiBaseUrl]);

  const handleSave = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      const response = await fetch(`${apiBaseUrl}/api/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
          bio: newBio,
        }),
      });
      if (response.ok) {
        const updated = await response.json();
        setProfile(updated);
        setIsEditing(false);
        addActivity("Updated profile name and bio");
        showSidebarToast("Profile updated!");
      } else {
        mockSaveFallback();
      }
    } catch (error) {
      mockSaveFallback();
    } finally {
      setIsSaving(false);
    }
  };

  const mockSaveFallback = () => {
    if (!profile) return;
    const updated = {
      ...profile,
      name: newName,
      bio: newBio
    };
    setProfile(updated);
    setIsEditing(false);
    addActivity("Updated profile details (Local)");
    showSidebarToast("Profile updated!");
  };

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChatAuthor || !newChatMessage.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: "You", text: newChatMessage, time };
    
    // Add user message
    const currentMessages = chatMessages[selectedChatAuthor] || [];
    const nextMessages = [...currentMessages, userMsg];
    setChatMessages({
      ...chatMessages,
      [selectedChatAuthor]: nextMessages
    });
    
    const sentMsgText = newChatMessage;
    setNewChatMessage('');
    addActivity(`Sent message to ${selectedChatAuthor}`);

    // Mock auto reply after 1 second
    setTimeout(() => {
      let replyText = "Thanks for your thoughts! I will look into it in my next analysis.";
      if (selectedChatAuthor === "MICHAEL BURRY") {
        replyText = "The numbers don't lie. Look at the Case-Shiller index. Default rates are rising.";
      } else if (selectedChatAuthor === "SHOBIN SHEIKH") {
        replyText = "Excellent point. I'll cover this in the tomorrow morning's Pulse of Profit Bulletin. Stay tuned!";
      } else if (selectedChatAuthor === "JAYANT MUNDHRA") {
        replyText = "The blending policy is driving sugarcane demands. Sugar mills are looking very profitable right now.";
      }
      
      const replyMsg = { sender: selectedChatAuthor.split(' ')[0], text: replyText, time };
      setChatMessages(prev => ({
        ...prev,
        [selectedChatAuthor]: [...(prev[selectedChatAuthor] || []), replyMsg]
      }));
      addActivity(`Received auto-reply from ${selectedChatAuthor}`);
    }, 1000);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setSupportSubmitted(true);
    addActivity("Submitted support help ticket");
    setTimeout(() => {
      setSupportSubmitted(false);
      setSupportMessage('');
      setActivePanel('main');
      showSidebarToast("Support request sent!");
    }, 2000);
  };

  const handleSignOutConfirm = () => {
    setIsSignedIn(false);
    addActivity("Signed out of account");
    showSidebarToast("Signed out successfully");
  };

  const handleSignInSimulate = () => {
    setIsSignedIn(true);
    setActivePanel('main');
    addActivity("Signed back into account");
    showSidebarToast("Signed in as Karan");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Container */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#0D1624]/95 backdrop-blur-2xl border-l border-white/10 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto text-white font-sans">
        
        {/* Sidebar Toast */}
        {sidebarToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 btn-cyan-gradient text-black text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_20px_rgba(66,232,255,0.6)] animate-bounce">
            {sidebarToast}
          </div>
        )}

        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between mb-8">
            {activePanel !== 'main' ? (
              <button 
                onClick={() => {
                  setSelectedChatAuthor(null);
                  setActivePanel('main');
                }}
                className="inline-flex items-center space-x-1 text-sm text-text-muted hover:text-text-light dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <h2 className="font-headline font-bold text-lg text-text-light dark:text-white">My Account</h2>
            )}
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-light dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSignedIn ? (
            /* Logged Out view simulation */
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 mx-auto flex items-center justify-center border border-black/10 dark:border-white/5">
                <LogOut className="w-8 h-8 text-text-muted" />
              </div>
              <div className="space-y-2">
                <h3 className="font-headline font-bold text-base text-text-light dark:text-white">Signed Out</h3>
                <p className="text-xs text-text-muted max-w-xs mx-auto leading-relaxed">
                  You have successfully logged out of Daily Bulletin by Pulse of Profit.
                </p>
              </div>
              <button 
                onClick={handleSignInSimulate}
                className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-md transition-all hover:scale-105"
              >
                Sign In Again
              </button>
            </div>
          ) : (
            /* Active Signed In Sub-views */
            <>
              {activePanel === 'main' && (
                /* MAIN MENU VIEW */
                <>
                  {/* User Profile Block */}
                  {profile && (
                    <div className="mb-6 p-4 rounded-xl glass-panel border border-white/10">
                      <div className="flex items-center space-x-3 mb-4">
                        <img 
                          src={profile.avatar} 
                          alt={profile.name} 
                          className="w-12 h-12 rounded-full bg-[#2D9CFF]/20 border border-[#42E8FF]/30"
                        />
                        <div className="flex-1 min-w-0">
                          {isEditing ? (
                            <input 
                              type="text" 
                              value={newName} 
                              onChange={(e) => setNewName(e.target.value)}
                              className="w-full glass-input text-white text-sm rounded px-2 py-1"
                            />
                          ) : (
                            <h3 className="font-headline font-bold text-white text-sm truncate">{profile.name}</h3>
                          )}
                          <p className="text-xs text-[#A0A7B5] truncate">{profile.email}</p>
                        </div>
                        <button 
                          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                          className="p-1.5 rounded-full hover:bg-white/10 text-[#42E8FF] transition-colors"
                          disabled={isSaving}
                        >
                          {isEditing ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Bio Field */}
                      <div className="text-xs text-[#A0A7B5]">
                        {isEditing ? (
                          <textarea 
                            value={newBio} 
                            onChange={(e) => setNewBio(e.target.value)}
                            rows={2}
                            className="w-full glass-input text-white text-xs rounded p-2 resize-none"
                          />
                        ) : (
                          <p className="italic">{profile.bio || "Set up your profile description..."}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation List */}
                  <nav className="space-y-1 mb-6">
                    <button 
                      onClick={() => { onClose(); router.push('/'); }} 
                      className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/5 text-left transition-colors"
                    >
                      <Home className="w-4 h-4 text-text-muted" />
                      <span>Home Feed</span>
                    </button>

                    <button 
                      onClick={() => setActivePanel('subscriptions')} 
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/5 text-left transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Compass className="w-4 h-4 text-text-muted" />
                        <span>Subscriptions</span>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                        {subscribedAuthors.length}
                      </span>
                    </button>

                    <button 
                      onClick={() => setActivePanel('saved')} 
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/5 text-left transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Bookmark className="w-4 h-4 text-text-muted" />
                        <span>Saved Bulletins</span>
                      </div>
                      <span className="text-xs bg-black/5 dark:bg-white/10 text-text-muted px-2 py-0.5 rounded-full">
                        {savedPostIds.length}
                      </span>
                    </button>

                    <button 
                      onClick={() => setActivePanel('chat')} 
                      className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/5 text-left transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-text-muted" />
                      <span>Author Chatrooms</span>
                    </button>

                    <button 
                      onClick={() => setActivePanel('moderation')} 
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/5 text-left transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <ShieldAlert className="w-4 h-4 text-text-muted" />
                        <span>Moderation Settings</span>
                      </div>
                      <span className="text-xs text-text-muted font-label">
                        {blockedAuthors.length + mutedAuthors.length + reportedPostIds.length} items
                      </span>
                    </button>
                  </nav>

                  <hr className="border-black/10 dark:border-white/5 mb-6" />

                  {/* Sub-menu items */}
                  <nav className="space-y-1">
                    <button 
                      onClick={() => setActivePanel('settings')} 
                      className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/5 text-left transition-colors"
                    >
                      <Settings className="w-4 h-4 text-text-muted" />
                      <span>Settings</span>
                    </button>

                    <button 
                      onClick={() => setActivePanel('support')} 
                      className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/5 text-left transition-colors"
                    >
                      <LifeBuoy className="w-4 h-4 text-text-muted" />
                      <span>Support Helpdesk</span>
                    </button>

                    <button 
                      onClick={() => setActivePanel('signout')} 
                      className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/5 text-left transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </nav>
                </>
              )}

              {activePanel === 'subscriptions' && (
                /* SUBSCRIPTIONS VIEW */
                <div className="space-y-4 font-body">
                  <h3 className="font-headline font-bold text-sm text-text-light dark:text-white border-b border-black/5 dark:border-white/5 pb-2">
                    My Subscriptions
                  </h3>
                  <div className="space-y-2">
                    {["SHOBIN SHEIKH", "JAYANT MUNDHRA", "MICHAEL BURRY"].map((author) => {
                      const isSubscribed = subscribedAuthors.includes(author);
                      return (
                        <div key={author} className="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                          <div>
                            <div className="font-semibold text-xs text-text-light dark:text-white">{author}</div>
                            <div className="text-[10px] text-text-muted mt-0.5">Author on Daily Bulletin</div>
                          </div>
                          <button
                            onClick={() => {
                              if (isSubscribed) {
                                setSubscribedAuthors(subscribedAuthors.filter(a => a !== author));
                                showSidebarToast(`Unsubscribed from ${author}`);
                                addActivity(`Unsubscribed from ${author}`);
                              } else {
                                setSubscribedAuthors([...subscribedAuthors, author]);
                                showSidebarToast(`Subscribed to ${author}!`);
                                addActivity(`Subscribed to ${author}`);
                              }
                            }}
                            className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                              isSubscribed 
                                ? 'bg-black/5 dark:bg-white/10 text-text-muted hover:bg-red-500/10 hover:text-red-400'
                                : 'bg-[#FF6B00] text-white hover:bg-[#E05E00]'
                            }`}
                          >
                            {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activePanel === 'saved' && (
                /* SAVED BULLETINS VIEW */
                <div className="space-y-4">
                  <h3 className="font-headline font-bold text-sm text-text-light dark:text-white border-b border-black/5 dark:border-white/5 pb-2">
                    Saved Bulletins
                  </h3>
                  <div className="space-y-2">
                    {posts.filter(p => savedPostIds.includes(p.id)).length === 0 ? (
                      <p className="text-xs text-text-muted text-center py-6 italic">No saved bulletins yet.</p>
                    ) : (
                      posts.filter(p => savedPostIds.includes(p.id)).map((p) => (
                        <div key={p.id} className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-start justify-between gap-2">
                          <button 
                            onClick={() => {
                              onClose();
                              router.push(`/posts/${p.id}`);
                            }}
                            className="flex-1 text-left"
                          >
                            <h4 className="font-semibold text-xs text-text-light dark:text-white hover:text-primary transition-colors line-clamp-1">{p.title}</h4>
                            <p className="text-[10px] text-text-muted mt-0.5">{p.author} • {p.date}</p>
                          </button>
                          <button
                            onClick={() => {
                              setSavedPostIds(savedPostIds.filter(id => id !== p.id));
                              showSidebarToast("Removed from saved");
                              addActivity(`Removed from saved: ${p.title}`);
                            }}
                            className="p-1 text-text-muted hover:text-red-400 transition-colors"
                            title="Remove bookmark"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activePanel === 'chat' && (
                /* CHAT SUB-VIEW */
                <div className="space-y-4">
                  {!selectedChatAuthor ? (
                    <>
                      <h3 className="font-headline font-bold text-sm text-text-light dark:text-white border-b border-black/5 dark:border-white/5 pb-2">
                        Author Chatrooms
                      </h3>
                      <div className="space-y-2">
                        {["SHOBIN SHEIKH", "JAYANT MUNDHRA", "MICHAEL BURRY"].map((author) => (
                          <button
                            key={author}
                            onClick={() => setSelectedChatAuthor(author)}
                            className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between text-left hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                          >
                            <div>
                              <div className="font-semibold text-xs text-text-light dark:text-white">{author}</div>
                              <p className="text-[10px] text-text-muted mt-0.5 line-clamp-1">
                                {(chatMessages[author] && chatMessages[author][chatMessages[author].length - 1]?.text) || "Start a chat conversation..."}
                              </p>
                            </div>
                            <span className="text-[9px] text-text-muted">Chat</span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col h-[65vh] justify-between">
                      {/* Chat Header */}
                      <div className="border-b border-black/5 dark:border-white/5 pb-2 mb-2">
                        <h4 className="font-headline font-bold text-xs text-text-light dark:text-white">{selectedChatAuthor}</h4>
                        <span className="text-[9px] text-text-muted">Active response agent</span>
                      </div>

                      {/* Chat Message List */}
                      <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-2 my-2 scroll-bar">
                        {(chatMessages[selectedChatAuthor] || []).map((msg, idx) => (
                          <div 
                            key={idx} 
                            className={`flex flex-col max-w-[80%] ${msg.sender === "You" ? "ml-auto items-end" : "mr-auto items-start"}`}
                          >
                            <span className="text-[9px] text-text-muted font-semibold mb-0.5">{msg.sender}</span>
                            <div className={`p-2.5 rounded-2xl text-xs leading-relaxed ${
                              msg.sender === "You" 
                                ? "bg-primary text-white rounded-tr-none" 
                                : "bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-tl-none"
                            }`}>
                              {msg.text}
                            </div>
                            <span className="text-[8px] text-text-muted mt-1">{msg.time}</span>
                          </div>
                        ))}
                      </div>

                      {/* Chat Input form */}
                      <form onSubmit={handleChatSend} className="relative flex items-center border-t border-black/5 dark:border-white/5 pt-2">
                        <input 
                          type="text"
                          placeholder={`Message ${selectedChatAuthor.split(' ')[0]}...`}
                          value={newChatMessage}
                          onChange={(e) => setNewChatMessage(e.target.value)}
                          className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-primary/50 text-text-light dark:text-white pr-10"
                        />
                        <button 
                          type="submit"
                          className="absolute right-2 p-1 text-primary hover:scale-105 active:scale-95 transition-all"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {activePanel === 'settings' && (
                /* SETTINGS VIEW */
                <div className="space-y-4">
                  <h3 className="font-headline font-bold text-sm text-text-light dark:text-white border-b border-black/5 dark:border-white/5 pb-2">
                    Preferences Settings
                  </h3>
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-xs text-text-light dark:text-white">Email Alerts</div>
                        <p className="text-[10px] text-text-muted mt-0.5">Receive newsletter on publishing</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={settingsNotify}
                        onChange={(e) => {
                          setSettingsNotify(e.target.checked);
                          showSidebarToast("Alert settings updated!");
                          addActivity(`Toggled email alerts: ${e.target.checked}`);
                        }}
                        className="w-4 h-4 accent-primary"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-xs text-text-light dark:text-white">Weekly Digests</div>
                        <p className="text-[10px] text-text-muted mt-0.5">Get a curated weekend bulletin</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={settingsDigest}
                        onChange={(e) => {
                          setSettingsDigest(e.target.checked);
                          showSidebarToast("Digest settings updated!");
                          addActivity(`Toggled weekly digests: ${e.target.checked}`);
                        }}
                        className="w-4 h-4 accent-primary"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-xs text-text-light dark:text-white">Dark Theme Interface</div>
                        <p className="text-[10px] text-text-muted mt-0.5">Forces Sleek Dark Mode layout</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={settingsDark}
                        onChange={(e) => {
                          setSettingsDark(e.target.checked);
                          showSidebarToast("Theme preferences saved!");
                          addActivity(`Toggled sidebar dark setting: ${e.target.checked}`);
                          
                          // Toggle theme directly
                          const html = document.documentElement;
                          if (e.target.checked) {
                            html.classList.remove('light');
                            html.classList.add('dark');
                            html.style.backgroundColor = '#121414';
                            html.style.color = '#E2E2E2';
                          } else {
                            html.classList.remove('dark');
                            html.classList.add('light');
                            html.style.backgroundColor = '#FFFFFF';
                            html.style.color = '#1F2937';
                          }
                        }}
                        className="w-4 h-4 accent-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activePanel === 'support' && (
                /* SUPPORT VIEW */
                <div className="space-y-4">
                  <h3 className="font-headline font-bold text-sm text-text-light dark:text-white border-b border-black/5 dark:border-white/5 pb-2">
                    Helpdesk Support
                  </h3>
                  <form onSubmit={handleSupportSubmit} className="space-y-4 pt-2">
                    <div>
                      <label className="block text-[10px] text-text-muted mb-1 uppercase font-semibold">How can we help?</label>
                      <textarea 
                        placeholder="Explain details of issues or bug reports here..."
                        value={supportMessage}
                        onChange={(e) => setSupportMessage(e.target.value)}
                        required
                        rows={5}
                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5 rounded-xl p-3 text-xs focus:outline-none focus:border-primary/50 resize-none text-text-light dark:text-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                    >
                      Submit Ticket
                    </button>
                  </form>
                </div>
              )}

              {activePanel === 'moderation' && (
                /* MODERATION PANEL VIEW */
                <div className="space-y-6 font-body">
                  <h3 className="font-headline font-bold text-sm text-text-light dark:text-white border-b border-black/5 dark:border-white/5 pb-2">
                    Moderation Settings
                  </h3>

                  {/* Blocked Authors Section */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-text-muted flex items-center space-x-1.5 uppercase tracking-wider">
                      <Ban className="w-3.5 h-3.5" />
                      <span>Blocked Authors ({blockedAuthors.length})</span>
                    </h4>
                    {blockedAuthors.length === 0 ? (
                      <p className="text-[11px] text-text-muted italic pl-1">No blocked authors.</p>
                    ) : (
                      <div className="space-y-1.5">
                        {blockedAuthors.map((author) => (
                          <div key={author} className="flex items-center justify-between p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                            <span className="text-xs font-medium text-text-light dark:text-white">{author}</span>
                            <button
                              onClick={() => {
                                setBlockedAuthors(blockedAuthors.filter(a => a !== author));
                                showSidebarToast(`Unblocked ${author}`);
                                addActivity(`Unblocked ${author}`);
                              }}
                              className="text-[10px] font-bold text-primary hover:underline px-2 py-1"
                            >
                              Unblock
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Muted Authors Section */}
                  <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
                    <h4 className="text-xs font-semibold text-text-muted flex items-center space-x-1.5 uppercase tracking-wider">
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Muted Authors ({mutedAuthors.length})</span>
                    </h4>
                    {mutedAuthors.length === 0 ? (
                      <p className="text-[11px] text-text-muted italic pl-1">No muted authors.</p>
                    ) : (
                      <div className="space-y-1.5">
                        {mutedAuthors.map((author) => (
                          <div key={author} className="flex items-center justify-between p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                            <span className="text-xs font-medium text-text-light dark:text-white">{author}</span>
                            <button
                              onClick={() => {
                                setMutedAuthors(mutedAuthors.filter(a => a !== author));
                                showSidebarToast(`Unmuted ${author}`);
                                addActivity(`Unmuted ${author}`);
                              }}
                              className="text-[10px] font-bold text-primary hover:underline px-2 py-1"
                            >
                              Unmute
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Reported Posts Section */}
                  <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
                    <h4 className="text-xs font-semibold text-text-muted flex items-center space-x-1.5 uppercase tracking-wider">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Reported Bulletins ({reportedPostIds.length})</span>
                    </h4>
                    {reportedPostIds.length === 0 ? (
                      <p className="text-[11px] text-text-muted italic pl-1">No reported bulletins.</p>
                    ) : (
                      <div className="space-y-1.5">
                        {reportedPostIds.map((id) => {
                          const p = posts.find(post => post.id === id);
                          const displayTitle = p ? p.title : `Bulletin ID ${id}`;
                          return (
                            <div key={id} className="flex items-center justify-between p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 gap-3">
                              <span className="text-xs font-medium text-text-light dark:text-white truncate flex-1">{displayTitle}</span>
                              <button
                                onClick={() => {
                                  setReportedPostIds(reportedPostIds.filter(item => item !== id));
                                  showSidebarToast("Report removed");
                                  addActivity(`Removed report on post ID ${id}`);
                                }}
                                className="text-[10px] font-bold text-primary hover:underline whitespace-nowrap px-2 py-1"
                              >
                                Remove Report
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activePanel === 'signout' && (
                /* SIGN OUT VERIFICATION VIEW */
                <div className="space-y-6 pt-6 text-center">
                  <div className="space-y-2">
                    <h3 className="font-headline font-bold text-sm text-text-light dark:text-white">Confirm Sign Out</h3>
                    <p className="text-xs text-text-muted max-w-[250px] mx-auto leading-relaxed">
                      Are you sure you want to end your current session? You can sign back in anytime.
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 justify-center">
                    <button 
                      onClick={() => setActivePanel('main')}
                      className="px-4 py-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSignOutConfirm}
                      className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-xl text-xs font-bold shadow-md"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-black/10 dark:border-white/5">
          {activePanel !== 'app' ? (
            <button 
              onClick={() => setActivePanel('app')}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors mb-6"
            >
              <span>Get the App</span>
              <Smartphone className="w-4 h-4" />
            </button>
          ) : (
            <div className="mb-6 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col items-center space-y-3">
              {/* QR Code Graphic Mock */}
              <div className="w-24 h-24 bg-white p-1 rounded border flex items-center justify-center">
                <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="currentColor">
                  {/* Mock QR Code paths */}
                  <rect x="10" y="10" width="20" height="20" />
                  <rect x="70" y="10" width="20" height="20" />
                  <rect x="10" y="70" width="20" height="20" />
                  <rect x="30" y="30" width="10" height="10" />
                  <rect x="50" y="50" width="10" height="10" />
                  <rect x="40" y="60" width="20" height="20" />
                  <rect x="70" y="70" width="10" height="10" />
                  <rect x="80" y="80" width="10" height="10" />
                </svg>
              </div>
              <div className="text-center">
                <div className="font-bold text-[10px] text-text-light dark:text-white">Scan to install Substack APP</div>
                <p className="text-[8px] text-text-muted mt-0.5">Compatible with iOS & Android devices</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center text-[10px] text-text-muted">
            <Link href="#about" className="hover:underline">About</Link>
            <span>•</span>
            <Link href="#privacy" className="hover:underline">Privacy</Link>
            <span>•</span>
            <Link href="#terms" className="hover:underline">Terms</Link>
            <span>•</span>
            <Link href="#data" className="hover:underline">Data</Link>
            <span>•</span>
            <Link href="#accessibility" className="hover:underline">Accessibility</Link>
          </div>
        </div>
      </div>
    </>
  );
}
