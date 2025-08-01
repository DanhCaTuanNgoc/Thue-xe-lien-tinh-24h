'use client';

import React, { useEffect } from 'react';
import { 
  LoginForm, 
  TabNavigation, 
  CarManagement, 
  CarTypeManagement, 
  PostManagement 
} from './components';
import { 
  useAdminAuth, 
  useCarManagement, 
  useCarTypeManagement, 
  usePostManagement 
} from './hooks';

export default function AdminPage() {
  // Auth
  const { authenticated, error, handleLogin } = useAdminAuth();
  
  // Tabs
  const [tab, setTab] = React.useState<'car' | 'post' | 'car_type'>('car');
  
  // Hooks for different management sections
  const carManagement = useCarManagement();
  const carTypeManagement = useCarTypeManagement();
  const postManagement = usePostManagement();

  // Fetch data when authenticated and tab changes
  useEffect(() => {
    if (!authenticated) return;
    
    if (tab === 'car') {
      carManagement.loadCars();
      carTypeManagement.loadCarTypes(); // Load car types for dropdown
    } else if (tab === 'post') {
      postManagement.loadPosts();
    } else if (tab === 'car_type') {
      carTypeManagement.loadCarTypes();
    }
  }, [authenticated, tab]);

  // Admin login
  if (!authenticated) {
    return <LoginForm onLogin={handleLogin} error={error} />;
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with tabs */}
        <TabNavigation currentTab={tab} onTabChange={setTab} />

        {/* Content based on selected tab */}
        {tab === 'car' && (
          <CarManagement
            cars={carManagement.cars}
            carTypes={carTypeManagement.carTypes}
            carForm={carManagement.carForm}
            editingCarId={carManagement.editingCarId}
            loading={carManagement.loading}
            onCarFormChange={carManagement.setCarForm}
            onCarSubmit={carManagement.handleCarSubmit}
            onCarEdit={carManagement.handleCarEdit}
            onCarDelete={carManagement.handleCarDelete}
            onCancelEdit={carManagement.handleCancelEdit}
          />
        )}

        {tab === 'car_type' && (
          <CarTypeManagement
            carTypes={carTypeManagement.carTypes}
            carTypeForm={carTypeManagement.carTypeForm}
            editingCarTypeId={carTypeManagement.editingCarTypeId}
            loading={carTypeManagement.loading}
            onCarTypeFormChange={carTypeManagement.setCarTypeForm}
            onCarTypeSubmit={carTypeManagement.handleCarTypeSubmit}
            onCarTypeEdit={carTypeManagement.handleCarTypeEdit}
            onCarTypeDelete={carTypeManagement.handleCarTypeDelete}
            onCancelEdit={carTypeManagement.handleCancelEdit}
          />
        )}

        {tab === 'post' && (
          <PostManagement
            posts={postManagement.posts}
            postForm={postManagement.postForm}
            postImages={postManagement.postImages}
            editingPostId={postManagement.editingPostId}
            loading={postManagement.loading}
            onPostFormChange={postManagement.setPostForm}
            onPostSubmit={postManagement.handlePostSubmit}
            onPostEdit={postManagement.handlePostEdit}
            onPostDelete={postManagement.handlePostDelete}
            onCancelEdit={postManagement.handleCancelEdit}
            onImageUpload={postManagement.handleImageUpload}
            onRemoveImage={postManagement.removeImage}
          />
        )}
      </div>
    </div>
  );
}
